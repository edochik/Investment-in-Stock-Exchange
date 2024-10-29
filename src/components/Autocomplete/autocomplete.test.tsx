import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Autocomplete } from "./Autocomplete";
// <Autocomplete
//           key={selectedSecurity?.secid}
//           items={companies}
//           filterByKey={({ secid, shortname }, query) =>
//             [secid, shortname].some((val) =>
//               val.toLowerCase().startsWith(query.toLowerCase())
//             )
//           }
//           render={({ secid, shortname }) => (
//             <>
//               <RenderLogo secid={secid} shortname={shortname} />
//               <p className={s.text}>
//                 {secid} {shortname}
//               </p>
//             </>
//           )}
//           value={selectedSecurity}
//           setValue={setSelectedSecurity}
//           inputStringValue={({ secid }) => secid}
//         />

// test("тестирование компонента Autocomplete", async () => {
//   // interface Items {
//   //   secid: string;
//   //   shortname: string;
//   // }
//   // const key ="AABB"
//   const items = ["red", "blue", "green"];
//   const filterByKey = (value: string, query: string) => value.startsWith(query);
//   const show = (item: string) => <p>{item}</p>;
//   const value = null;
//   const setValue = (arg: string | null) => console.log(">>>>>", arg);
//   const inputStringValue = (arg: string) => arg;
//   render(
//     <Autocomplete
//       items={items}
//       filterByKey={filterByKey}
//       render={show}
//       value={value}
//       setValue={setValue}
//       inputStringValue={inputStringValue}
//     />
//   );
// });

// https://testing-library.com/docs/queries/about/
export {};
