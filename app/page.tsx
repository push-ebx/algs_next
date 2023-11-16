import prisma from "@/app/lib/prisma";
import {Tree, TreeType} from "@/app/ui";

const fetchFirstUser = async () => {
  // const user = await prisma.user.findFirst();

  // return user;
}

const Content = async () => {
  // const user = await fetchFirstUser();

  return (
    <main>
      {/*{JSON.stringify(user)}*/}
    </main>
  )
}

export default Content;