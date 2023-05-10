import { NextPage } from "next";
import { HeaderMenu } from "../components/HeaderMenu";

export interface HeaderSearchProps {
  links: {
    link: string;
    label: string;
    links: { link: string; label: string }[];
  }[];
}

const linkMenu: HeaderSearchProps = {
  links: [
    {
      link: "/page1",
      label: "Page 1",
      links: [
        { link: "/page1/subpage1", label: "Subpage 1" },
        { link: "/page1/subpage2", label: "Subpage 2" },
      ],
    },
    {
      link: "/page2",
      label: "Page 2",
      links: [
        { link: "/page2/subpage1", label: "Subpage 1" },
        { link: "/page2/subpage2", label: "Subpage 2" },
      ],
    },
    {
      link: "/page3",
      label: "Page 3",
      links: [
        { link: "/page3/subpage1", label: "Subpage 1" },
        { link: "/page3/subpage2", label: "Subpage 2" },
      ],
    },
  ],
};

const Home: NextPage = () => {
  return (
    <>
      <HeaderMenu links={linkMenu.links} />
      <main className="container mx-auto">
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
          <div className="w-96 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-semibold">BMI Calculator</h2>
            <div className="mb-4">
              <label htmlFor="weight" className="block text-gray-700">
                体重 (kg)
              </label>
              <input
                id="weight"
                type="number"
                className="mt-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="height" className="block text-gray-700">
                身長 (cm)
              </label>
              <input
                id="height"
                type="number"
                className="mt-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              BMI を計算する
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
