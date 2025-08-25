fn main() {

    if cfg!(target_os = "windows") {
    
        println!("cargo:rustc-link-search=native=static");
        println!("cargo:rustc-link-lib=static=scm_bindings");
    
        println!("cargo:rustc-link-search=native=static/splitscm");
        println!("cargo:rustc-link-lib=static=scm_lib");
    
        println!("cargo:rustc-link-search=native=static/vcdiff");
        println!("cargo:rustc-link-lib=static=vcdiff");
        println!("cargo:rustc-link-lib=static=vcdcom");
        println!("cargo:rustc-link-lib=static=vcddec");
        println!("cargo:rustc-link-lib=static=vcdenc");
    }

    if cfg!(target_os = "linux") {
        println!("cargo:rustc-link-lib=stdc++");
        println!("cargo:rustc-link-lib=stdc++fs");
        println!("cargo:rustc-link-search=native=static");
        println!("cargo:rustc-link-lib=static=scm_bindings");
    
        println!("cargo:rustc-link-search=native=static/splitscm");
        println!("cargo:rustc-link-lib=static=scm_lib");

        println!("cargo:rustc-link-search=native=static/vcdiff");
        println!("cargo:rustc-link-lib=static=vcdcom");
        println!("cargo:rustc-link-lib=static=vcddec");
        println!("cargo:rustc-link-lib=static=vcdenc");
    }


    tauri_build::build()
}
