export type QuakeData = {
  acd: string;
  anm: string;
  at: string;
  cod: string;
  ctt: string;
  eid: string;
  en_anm: string;
  en_ttl: string;
  ift: string;
  int: {
    city: {
      code: string;
      maxi: string;
    }[];
    code: string;
    maxi: string;
  }[];
  json: string;
  mag: string;
  maxi: string;
  rdt: string;
  ser: string;
  ttl: string;
}[];

export const getQuakeList = async (mag = 3) => {
  const res = await fetch("https://www.jma.go.jp/bosai/quake/data/list.json");
  const dataList: QuakeData = await res.json();
  const aboveFourList = dataList.filter((data) => mag <= Number(data.mag));
  console.log(aboveFourList);
};
