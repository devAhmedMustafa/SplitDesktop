// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use tauri_plugin_oauth;

#[tauri::command]
fn scm_init(root_path: &str) {
    let c_root_path = std::ffi::CString::new(root_path).unwrap();
    unsafe { init(c_root_path.as_ptr()) };
}

#[tauri::command]
fn scm_add(root_path: &str, file_path: &str) {
    let c_root_path = std::ffi::CString::new(root_path).unwrap();
    let c_file_path = std::ffi::CString::new(file_path).unwrap();
    unsafe { add(c_root_path.as_ptr(), c_file_path.as_ptr()) };
}

#[tauri::command]
fn scm_commit(root_path: &str, message: &str, author: &str) {
    let c_root_path = std::ffi::CString::new(root_path).unwrap();
    let c_message = std::ffi::CString::new(message).unwrap();
    let c_author = std::ffi::CString::new(author).unwrap();
    unsafe { commit(c_root_path.as_ptr(), c_message.as_ptr(), c_author.as_ptr()) };
}

#[tauri::command]
fn scm_checkout(root_path: &str, commit_id: &str) {
    let c_root_path = std::ffi::CString::new(root_path).unwrap();
    let c_commit_id = std::ffi::CString::new(commit_id).unwrap();
    unsafe { checkout(c_root_path.as_ptr(), c_commit_id.as_ptr()) };
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_oauth::init())
        .invoke_handler(tauri::generate_handler![greet, scm_init, scm_add, scm_commit, scm_checkout])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[link(name="scm_bindings", kind="static")]
extern "C" {
    fn init(rootPath: *const i8);
    fn add(rootPath: *const i8, filePath: *const i8);
    fn commit(rootPath: *const i8, message: *const i8, author: *const i8);
    fn checkout(rootPath: *const i8, commitId: *const i8);
}