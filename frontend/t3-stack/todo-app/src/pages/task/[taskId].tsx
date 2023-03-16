import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { api } from "~/utils/api";
import { Layout } from "~/components/Layout";

const SingleTaskPage: NextPage = () => {
  const router = useRouter();
  const taskId = router.query.taskId as string;
  const { data, isLoading, error } = api.todo.getSingleTask.useQuery({
    taskId,
  });
  if (isLoading) {
    return <Layout title="Task Detail">Loading single task...</Layout>;
  }
  if (error) {
    return <Layout title="Task Detail">{error.message}</Layout>;
  }
  return (
    <Layout title="Task Detail">
      <p className="text-x1 mb-3 font-bold text-blue-600">{data?.title}</p>
      <p className="text-gray-300">{data?.body}</p>
      <p className="my-1 text-sm text-gray-300">
        {data && format(new Date(data.createAt), "yyyy-MM-dd HH:mm:ss")}
      </p>
      <p className="my-1 text-sm text-gray-300">
        {data && format(new Date(data.updateAt), "yyyy-MM-dd HH:mm:ss")}
      </p>
      <Link href={`/`}>
        <ArrowUturnLeftIcon className="mt-3 h-6 w-6 cursor-pointer text-blue-600" />
      </Link>
    </Layout>
  );
};

export default SingleTaskPage;
