import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApiDetailThred } from "../service/api/Threds";
import HTMLReactParser from "html-react-parser";

const ThredDetails = () => {
  const { slug } = useParams();

  const [thredDetail, setThredDetail] = useState({});

  const detailThred = async () => {
    const data = await getApiDetailThred(slug);
    setThredDetail(data);
  };

  const convertToHtml = () => {
    return { __html: thredDetail.thread_desc };
  };

  useEffect(() => {
    detailThred();
  }, []);

  return (
    <div className="bg-white min-h-screen rounded-md px-12">
      <h1>{thredDetail.thread_name}</h1>
      <div>
        {/* {thredDetail.thread_desc && HTMLReactParser(thredDetail.thread_desc)} */}
        <div dangerouslySetInnerHTML={convertToHtml()} />
      </div>
    </div>
  );
};

export default ThredDetails;

// import React, { useEffect, useState } from "react";
// import { Parser } from "htmlparser2";
// import { useParams } from "react-router-dom";
// import { getApiDetailThred } from "../service/api/Threds";

// const ThredDetails = () => {
//   const [parsedContent, setParsedContent] = useState([]);
//   const [thredDetail, setThredDetail] = useState({});

//   const { slug } = useParams();

//   const detailThred = async () => {
//     const data = await getApiDetailThred(slug);
//     setThredDetail(data);
//   };

//   useEffect(() => {
//     const htmlString = "";
//     parseHtmlString(htmlString);
//   }, []); // Empty dependency array to run only on component mount

//   useEffect(() => {
//     detailThred();
//   }, []);

//   const parseHtmlString = (htmlString) => {
//     const elements = [];
//     const parser = new Parser(
//       {
//         onopentag(name, attribs) {
//           elements.push({ type: "tag", name, attribs });
//         },
//         ontext(text) {
//           elements.push({ type: "text", text });
//         },
//         onclosetag(tagname) {
//           elements.push({ type: "closetag", name: tagname });
//         },
//       },
//       { decodeEntities: true }
//     );

//     parser.write(htmlString);
//     parser.end();

//     setParsedContent(elements);
//   };

//   const renderParsedContent = (content) => {
//     return content.map((item, index) => {
//       if (item.type === "tag") {
//         return React.createElement(item.name, { key: index, ...item.attribs });
//       } else if (item.type === "text") {
//         return item.text;
//       } else if (item.type === "closetag") {
//         return null; // Closing tags are handled implicitly by React
//       }
//       return null;
//     });
//   };

//   return (
//     <div className="text-white">
//       <div>{renderParsedContent(parsedContent)}</div>
//       <ol>
//         <li>anjing</li>
//         <li>bangsat</li>
//       </ol>
//     </div>
//   );
// };

// export default ThredDetails;
