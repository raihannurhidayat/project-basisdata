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
