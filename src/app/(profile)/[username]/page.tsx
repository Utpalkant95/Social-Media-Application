
const Page = ({params} : {params: {username: string}}) => {
    const {username} = params
  return (
    <div>User Name {username} </div>
  )
}

export default Page