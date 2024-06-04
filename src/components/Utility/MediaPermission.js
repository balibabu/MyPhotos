import { PermissionsAndroid } from "react-native";

export default async function askForMediaPermission() {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
    return granted;
}
