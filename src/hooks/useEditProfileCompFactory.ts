import { AccountPrivacy, ChangePassword, EditProfile } from "@/Fragments";


const useEditProfileCompFactory = (activeSection: string) => {
    switch (activeSection) {
        case "Edit Profile":
            return EditProfile
            break;
        case "Account Privacy":
            return AccountPrivacy
            break;
        case "Change Password":
            return ChangePassword
            break;
        default:
            return EditProfile
            break;
    }
}

export default useEditProfileCompFactory