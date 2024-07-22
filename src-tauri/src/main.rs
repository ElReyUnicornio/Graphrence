// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{params, Connection, Result};
use base64::{Engine as _, engine::general_purpose};
use lopdf::Document;
use regex::Regex;

// Initialize the database -------------------------------------------------------------------

fn initialize_db() -> Result<Connection> {
    let conn = Connection::open("app_data.db")?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS projects (
                  uid text not null PRIMARY KEY,
                  name TEXT NOT NULL,
                  articleNumber INTEGER,
                  lastUpdate TEXT NOT NULL
                  )",
        [],
    )?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS articles (
                  uid varchar() PRIMARY KEY,
                  projectUid TEXT NOT NULL,
                  name TEXT NOT NULL,
                  relations TEXT NOT NULL,
                  filePath TEXT,
                  constraints foreign key(projectUid) references projects(uid)
                  )",
        [],
    )?;
    Ok(conn)
}


// Tauri commands ----------------------------------------------------------------------------

// Projects CRUD -----------------------------------------------------------------------------
#[tauri::command]
fn get_projects() -> Result<Vec<String>, tauri::InvokeError> {
    match initialize_db() {
        Ok(conn) => {
            match conn.prepare("SELECT name FROM projects") {
                Ok(mut stmt) => {
                    let projects = stmt
                        .query_map([], |row| row.get(0)).ok().unwrap()
                        .map(|result| result.unwrap())
                        .collect();
                    Ok(projects)
                }
                Err(e) => {
                    println!("Error preparing statement: {}", e);
                    Err(tauri::InvokeError::from(e.to_string()))
                }
            }
        }
        Err(e) => {
            println!("Error initializing database: {}", e);
            Err(tauri::InvokeError::from(e.to_string()))
        }
    }
    
}

#[tauri::command]
fn add_project(name: &str) -> Result<(), tauri::InvokeError> {
    let conn = initialize_db().ok().unwrap();
    match conn.execute(
        "INSERT INTO projects (uid, name, articleNumber, lastUpdate) VALUES (?1, ?2, 0, datetime('now'))",
        params![uuid::Uuid::new_v4().to_string(), name],
    ) {
        Ok(_) => Ok(()),
        Err(e) => {
            println!("Error adding project: {}", e);
            Err(tauri::InvokeError::from(e.to_string()))
        }
    }
}

#[tauri::command]
fn delete_project(name: &str) -> Result<(), tauri::InvokeError> {
    let conn = initialize_db().ok().unwrap();
    match conn.execute("DELETE FROM projects WHERE name = ?1", params![name]) {
        Ok(_) => Ok(()),
        Err(e) => {
            println!("Error deleting project: {}", e);
            Err(tauri::InvokeError::from(e.to_string()))
        }
    }
}

// Articles CRUD -----------------------------------------------------------------------------
#[tauri::command]
fn get_articles(project_name: &str) -> Result<Vec<String>, tauri::InvokeError> {
    let conn = initialize_db().ok().unwrap();
    let mut stmt = conn.prepare("SELECT name FROM articles WHERE projectUid = (SELECT uid FROM projects WHERE name = ?1)").ok().unwrap();
    let articles = stmt
        .query_map(params![project_name], |row| row.get(0)).ok().unwrap()
        .map(|result| result.unwrap())
        .collect();
    Ok(articles)
}

#[tauri::command]
fn add_article(project_name: &str, article_name: &str, relations: &str, file_path: &str) -> Result<(), tauri::InvokeError> {
    let conn = initialize_db().ok().unwrap();
    match conn.execute(
        "INSERT INTO articles (uid, projectUid, name, relations, filePath) VALUES (?1, (SELECT uid FROM projects WHERE name = ?2), ?3, ?4, ?5)",
        params![uuid::Uuid::new_v4().to_string(), project_name, article_name, relations, file_path],
    ) {
        Ok(_) => Ok(()),
        Err(e) => {
            println!("Error adding article: {}", e);
            Err(tauri::InvokeError::from(e.to_string()))
        }
    }
}

// PDF data extraction -----------------------------------------------------------------------
fn extract_text_from_pdf(file_path: &str) -> Result<String, lopdf::Error> {
    let doc = Document::load(file_path)?;
    let mut full_text = String::new();

    for page_id in doc.page_iter() {
        if let Ok(page) = doc.get_page_content(page_id) {
            if let Ok(content) = String::from_utf8(page) {
                full_text.push_str(&content);
            }
        }
    }
    Ok(full_text)
}

fn extract_references(text: &str) -> Vec<String> {
    let original_pattern = Regex::new(r"\.([A-Za-z,\&\.\s]+)\.").unwrap();
    let matches: Vec<&str> = original_pattern.captures_iter(&text)
        .map(|cap| cap.get(1).unwrap().as_str())
        .collect();

    matches.iter().map(|m| m.to_string()).collect()
}

#[tauri::command]
fn extract_references_from_pdf(title: String, content: String) -> Result<Vec<String>, tauri::InvokeError> {
    let bytes = general_purpose::STANDARD
    .decode(content).unwrap();
    let file_path = format!("./files/{}.pdf", title);

    match std::fs::write(&file_path, &bytes).map_err(|e| e.to_string()) {
        Ok(_) => {
            let text = extract_text_from_pdf(&file_path).ok().unwrap();
            let references = extract_references(&text);
            Ok(references)
        },
        Err(e) => {
            println!("Error writing file: {}", e);
            return Err(tauri::InvokeError::from(e));
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![extract_references_from_pdf, get_projects, add_project, delete_project, get_articles, add_article])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


#[test]
fn testpdf() {
    print!("start --------------------------------------------------------------------");
    let text = extract_text_from_pdf("./files/Prueba.pdf").ok().unwrap();

    let original_pattern = Regex::new(r"(?:\(([^)]*)\))+").unwrap();
    let matches: Vec<&str> = original_pattern.captures_iter(&text)
        .map(|cap| cap.get(1).unwrap().as_str())
        .collect();
    let original_string: String = matches.concat();

    let references_text = original_string.split_at(original_string.find("References").unwrap() + "References".len());
    println!("{:?}", references_text.1);

    let references = extract_references(&references_text.1);
    println!("{:?}", references);
}