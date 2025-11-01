# 📱 HƯỚNG DẪN BUILD EAS PREVIEW

## Bước 1: Cài đặt EAS CLI (nếu chưa có)

```bash
npm install -g eas-cli
```

## Bước 2: Đăng nhập Expo

```bash
eas login
```

- Nhập email và password của tài khoản Expo
- Nếu chưa có tài khoản, đăng ký tại: https://expo.dev/signup

## Bước 3: Cấu hình project

```bash
cd D:\ReactNative\Tuan09\expense-tracker
eas build:configure
```

## Bước 4: Build Preview cho Android

```bash
eas build --platform android --profile preview
```

**Lưu ý:**

- Quá trình build mất khoảng 5-15 phút
- Sau khi build xong, sẽ có link download file APK
- Copy link đó và paste vào file `EAS_BUILD_LINK.txt`

## Bước 5: Build Preview cho iOS (tùy chọn)

```bash
eas build --platform ios --profile preview
```

## Cấu trúc file đã tạo:

- ✅ `eas.json` - Cấu hình EAS build
- ✅ `app.json` - Đã thêm bundleIdentifier và package name
- ✅ Hướng dẫn này

## Lấy link build:

Sau khi build xong, vào https://expo.dev/accounts/[your-account]/projects/expense-tracker/builds
Hoặc xem link trực tiếp trong terminal sau khi build thành công.

## Link build sẽ có dạng:

```
https://expo.dev/accounts/[username]/projects/expense-tracker/builds/[build-id]
```

Copy link này vào file `EAS_BUILD_LINK.txt` để nộp bài.
