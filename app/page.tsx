import prisma from "@/app/lib/prisma";

const fetchFirstUser = async () => {
  const user = await prisma.user.findFirst();
  return user;
}

const Content = async () => {
  const user = await fetchFirstUser();

  return (
    <main>
      {JSON.stringify(user)}
    </main>
  )
}

export default Content;