import { ProfileFrag } from "@/Fragments"
const Page = ({params} : {params: {username: string}}) => {
    const {username} = params
  return (
    <ProfileFrag>
      {username}
    </ProfileFrag>
  )
}

export default Page