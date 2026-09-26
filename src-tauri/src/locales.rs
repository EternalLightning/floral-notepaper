#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum Locale {
    #[default]
    ZhCn,
}

impl Locale {
    pub fn from_tag(_value: &str) -> Self {
        Self::ZhCn
    }
}
pub fn app_name(_locale: Locale) -> &'static str {
    "花笺"
}

pub fn main_window_title(locale: Locale) -> &'static str {
    app_name(locale)
}

pub fn notepad_window_title(_locale: Locale) -> &'static str {
    "花笺便签"
}

pub fn tile_window_title(_locale: Locale) -> &'static str {
    "花笺磁贴"
}

pub fn tray_tooltip(locale: Locale) -> &'static str {
    app_name(locale)
}

pub fn tray_show_main_label(_locale: Locale) -> &'static str {
    "打开主窗口"
}

pub fn tray_quick_note_label(_locale: Locale) -> &'static str {
    "快速记录"
}

pub fn tray_toggle_close_to_tray_label(_locale: Locale) -> &'static str {
    "关闭到托盘"
}

pub fn tray_toggle_autostart_label(_locale: Locale) -> &'static str {
    "开机自启动"
}

pub fn tray_quit_label(_locale: Locale) -> &'static str {
    "退出"
}

pub fn macos_menu_file_label(_locale: Locale) -> &'static str {
    "文件"
}

pub fn macos_menu_edit_label(_locale: Locale) -> &'static str {
    "编辑"
}

pub fn macos_menu_view_label(_locale: Locale) -> &'static str {
    "显示"
}

pub fn macos_menu_window_label(_locale: Locale) -> &'static str {
    "窗口"
}

pub fn macos_menu_help_label(_locale: Locale) -> &'static str {
    "帮助"
}

pub fn macos_menu_about_label(locale: Locale) -> String {
    format!("关于{}", app_name(locale))
}

pub fn macos_menu_services_label(_locale: Locale) -> &'static str {
    "服务"
}

pub fn macos_menu_hide_app_label(locale: Locale) -> String {
    format!("隐藏{}", app_name(locale))
}

pub fn macos_menu_hide_others_label(_locale: Locale) -> &'static str {
    "隐藏其他"
}

pub fn macos_menu_quit_app_label(locale: Locale) -> String {
    format!("退出{}", app_name(locale))
}

pub fn macos_menu_close_window_label(_locale: Locale) -> &'static str {
    "关闭窗口"
}

pub fn macos_menu_minimize_label(_locale: Locale) -> &'static str {
    "最小化"
}

pub fn macos_menu_zoom_label(_locale: Locale) -> &'static str {
    "缩放"
}

pub fn macos_menu_fullscreen_label(_locale: Locale) -> &'static str {
    "进入全屏"
}

pub fn macos_menu_undo_label(_locale: Locale) -> &'static str {
    "撤销"
}

pub fn macos_menu_redo_label(_locale: Locale) -> &'static str {
    "重做"
}

pub fn macos_menu_cut_label(_locale: Locale) -> &'static str {
    "剪切"
}

pub fn macos_menu_copy_label(_locale: Locale) -> &'static str {
    "复制"
}

pub fn macos_menu_paste_label(_locale: Locale) -> &'static str {
    "粘贴"
}

pub fn macos_menu_select_all_label(_locale: Locale) -> &'static str {
    "全选"
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn native_labels_are_simplified_chinese_for_legacy_locales() {
        assert_eq!(Locale::from_tag("en-US"), Locale::ZhCn);
        assert_eq!(Locale::from_tag("zh-HK"), Locale::ZhCn);
        assert_eq!(app_name(Locale::ZhCn), "花笺");
        assert_eq!(tray_show_main_label(Locale::ZhCn), "打开主窗口");
        assert_eq!(macos_menu_about_label(Locale::ZhCn), "关于花笺");
    }
}
