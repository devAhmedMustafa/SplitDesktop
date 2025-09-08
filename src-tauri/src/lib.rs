// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

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
    println!("{}", c_root_path.to_string_lossy());
    unsafe { checkout(c_root_path.as_ptr(), c_commit_id.as_ptr()) };
}

#[tauri::command]
fn scm_status(root_path: &str) -> String {
    let c_root_path = std::ffi::CString::new(root_path).unwrap();
    unsafe {
        let status_ptr = rstatus(c_root_path.as_ptr());
        let c_str = std::ffi::CStr::from_ptr(status_ptr);
        c_str.to_string_lossy().into_owned()
    }
}

#[tauri::command]
fn scm_history(root_path: &str) -> String {
    let c_root_path = std::ffi::CString::new(root_path).unwrap();
    unsafe {
        let history_ptr = getCommitHistory(c_root_path.as_ptr());
        let c_str = std::ffi::CStr::from_ptr(history_ptr);
        c_str.to_string_lossy().into_owned()
    }
}

#[tauri::command]
fn scm_negotiate(root_path: &str, requested_commit_id: &str) -> String {
    let c_root_path = std::ffi::CString::new(root_path).unwrap();
    let c_requested_commit_id = std::ffi::CString::new(requested_commit_id).unwrap();
    unsafe {
        let response_ptr = negotiate(c_root_path.as_ptr(), c_requested_commit_id.as_ptr());
        let c_str = std::ffi::CStr::from_ptr(response_ptr);
        c_str.to_string_lossy().into_owned()
    }
}

#[tauri::command]
fn unzip_repo(zip_path: String, extract_to: String) -> Result<(), String> {
    let file = std::fs::File::open(zip_path).map_err(|e| e.to_string())?;
    let mut archive = zip::ZipArchive::new(file).map_err(|e| e.to_string())?;

    for i in 0..archive.len() {
        let mut file = archive.by_index(i).map_err(|e| e.to_string())?;
        let outpath = std::path::Path::new(&extract_to).join(file.name());

        if file.is_dir() {
            std::fs::create_dir_all(&outpath).map_err(|e| e.to_string())?;
        } else {
            if let Some(p) = outpath.parent() {
                std::fs::create_dir_all(&p).map_err(|e| e.to_string())?;
            }
            let mut outfile = std::fs::File::create(&outpath).map_err(|e| e.to_string())?;
            std::io::copy(&mut file, &mut outfile).map_err(|e| e.to_string())?;
        }
    }

    Ok(())
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            scm_init,
            scm_add,
            scm_commit,
            scm_checkout,
            scm_status,
            scm_history,
            scm_negotiate,
            unzip_repo
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[link(name = "scm_bindings", kind = "static")]
extern "C" {
    fn init(rootPath: *const i8);
    fn add(rootPath: *const i8, filePath: *const i8);
    fn commit(rootPath: *const i8, message: *const i8, author: *const i8);
    fn checkout(rootPath: *const i8, commitId: *const i8);
    fn getCommitHistory(rootPath: *const i8) -> *const i8;
    fn rstatus(rootPath: *const i8) -> *const i8;
    fn negotiate(rootPath: *const i8, requestedCommitId: *const i8) -> *const i8;
}
