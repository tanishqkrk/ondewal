import { OpenAI } from "openai";
import React from "react";
import { useState, useEffect } from "react";
import useCore from "../src/context/CoreContext";
import { MutatingDots } from "react-loader-spinner";
import { useRouter } from "next/router";
import Link from "next/link";
// import { useNavigate } from 'react-router-dom';
const Checkup = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [severity, setSeverity] = useState("");
  const [duration, setDuration] = useState("A few hours");
  const [frequency, setFrequency] = useState("All the time");
  const [prompt, setPrompt] = useState("");
  const [sum, setSum] = useState("");
  // const [apiResponse, setApiResponse] = useState();
  // const navigate = useNavigate();

  // console.log(messageToSend);
  // const options = {
  //   method: "POST",
  //   headers: {
  //     Origin: "http://localhost:3000",
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "include",
  //   body: JSON.stringify({
  //     message: messageToSend,
  //   }),
  // };
  const { response, setResponse, loading, setLoading } = useCore();
  //   const router = useRouter();
  useEffect(() => {
    if (severity !== "" && prompt !== "") {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  }, [severity, prompt]);

  async function fetchResponse(msg) {
    const openai = new OpenAI({
      apiKey: "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",
      dangerouslyAllowBrowser: true,
    });
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: msg }],
      max_tokens: 500,
    });

    return chatCompletion.choices[0].message;
  }
  async function validateForm(e) {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    setSum("");
    const checkupData = {
      message: prompt,
      sev: severity,
      duration: duration,
    };

    const messageToSend1 = `${checkupData.message} for the past ${
      checkupData.duration
    } and the problem is ${
      severity === "high"
        ? "very serious"
        : severity === "medium"
        ? "mildly serious"
        : severity === "low"
        ? "not very serious"
        : ""
    } give 5 remedies. Strictly remedies and strip away all the other text. Add a ~ at the start of each point.`;
    const messageToSend2 = `${checkupData.message} for the past ${
      checkupData.duration
    } and the problem is ${
      severity === "high"
        ? "very serious"
        : severity === "medium"
        ? "mildly serious"
        : severity === "low"
        ? "not very serious"
        : ""
    } What might be the causes? Add a ~ at the start of each point.`;

    try {
      const para = await fetchResponse(messageToSend2);
      await setSum(para);
      await setLoading(false);
      const data = await fetchResponse(messageToSend1);
      await setResponse(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading && (
        <div className="absolute w-screen h-screen flex justify-center items-center z-[999999999]">
          <div className="absolute   h-screen w-screen bg-black opacity-20"></div>
          <MutatingDots
            height="100"
            width="100"
            color="#36454F"
            secondaryColor="#36454F"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {/* <div className="absolute h-screen bg-white">
        <img className="w-32" src="/logo.jpg" alt="" />
        <div className="font-bold text-xl text-center w-full">Ondewal</div>
      </div> */}
      <div className="flex h-screen w-full items-center justify-evenly bg-primary gap-3 ">
        <div className=" w-2/5 h-screen rounded-tl-none rounded-bl-none  flex flex-col items-center justify-between gap-y-6 p-3 rounded-lg max-lg:w-2/4 max-md:w-3/4 max-sm:w-full max-sm:h-full max-sm:rounded-none gap-16">
          <div className="w-full flex flex-col justify-center items-center rounded-md">
            {/* <img className="w-32" src="/logo.jpg" alt="" /> */}
            <div className="text-white  w-full font-bold text-2xl logo">
              Ondewal
            </div>
          </div>
          <form
            style={{
              transform: sum ? "translateX(0%)" : "translateX(55%)",
              transition: ".7s ",
              zIndex: "99999",
            }}
            onSubmit={validateForm}
            className="bg-white rounded-md "
          >
            <div className="text-center text-2xl font-bold">
              Explain your problem
            </div>
            <div className="w-full flex flex-col items-center p-3 gap-y-5">
              <div className="flex items-center justify-between gap-x-5 w-full">
                <div className="text-lg font-semibold">Severity of problem</div>
                <div className="flex  justify-center items-end ">
                  <label>
                    <input
                      onChange={() => setSeverity("low")}
                      className="hidden peer"
                      type="radio"
                      id="low"
                      name="pain"
                      value="low"
                    />
                    <div
                      role={"button"}
                      className=" bg-primary opacity-40 hover:opacity-80 rounded-md py-2 px-4 m-2 transition ease-in-out delay-350 cursor-pointer peer-checked:opacity-100"
                    >
                      ☹️
                    </div>
                  </label>
                  <label>
                    <input
                      onChange={() => setSeverity("medium")}
                      className="hidden peer"
                      type="radio"
                      id="medium"
                      name="pain"
                      value="medium"
                    />
                    <div
                      role={"button"}
                      className=" bg-primary opacity-40 hover:opacity-80 rounded-md m-2 py-2 px-4 transition ease-in-out delay-350 cursor-pointer peer-checked:opacity-100"
                    >
                      😖
                    </div>
                  </label>
                  <label>
                    <input
                      onChange={() => setSeverity("high")}
                      className="hidden peer"
                      type="radio"
                      id="high"
                      name="pain"
                      value="high"
                    />
                    <div
                      role={"button"}
                      className=" bg-primary opacity-40 hover:opacity-80 rounded-md m-2 py-2 px-4 transition ease-in-out delay-350 cursor-pointer peer-checked:opacity-100"
                    >
                      😭
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex justify-between w-full items-center">
                <div className="text-lg font-semibold">Duration</div>
                <select
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                  className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 w-fit rounded-md py-3 pl-2 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 sm:text-sm"
                  name="duration"
                  id=""
                >
                  <option value="A few hours">A few hours</option>
                  <option value="One day">One day</option>
                  <option value="Three days">Three days</option>
                  <option value="One week">One week</option>
                  <option value="3 Weeks">3 Weeks</option>
                  <option value="More than or a month">
                    More than or a month
                  </option>
                </select>
              </div>
              {/* <div className="flex justify-between w-full items-center">
              <div className="text-lg font-semibold">Frequency</div>
              <select
                onChange={(e) => {
                  setFrequency(e.target.value);
                }}
                className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 w-fit rounded-md py-3 pl-2 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 sm:text-sm"
                name="duration"
                id=""
              >
                <option value="All the time">All the time</option>
                <option value="Frequent (almost all the time)">
                  Frequent (almost all the time)
                </option>
                <option value="Often (2-3 times per hour)">
                  Often (2-3 times per hour)
                </option>
                <option value="Rarely">Rarely</option>
              </select>
            </div> */}
              <div>
                <textarea
                  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt}
                  placeholder="Describe in your own words, be as precise and descriptive as possible!"
                  name="prompt"
                  id=""
                  cols="200"
                  rows="10"
                  className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 w-full rounded-md py-3 pl-2 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 sm:text-sm resize-none"
                ></textarea>
              </div>
              <button
                // disabled={!isValidated}
                className="p-3 bg-primary text-white rounded-lg w-full disabled:opacity-50 max-lg:w-full"
              >
                CHECK
              </button>
            </div>
          </form>
          <div></div>
        </div>
        <div
          className={`bg-white w-2/5 h-[90vh] overflow-y-scroll p-6 flex flex-col gap-8 rounded-md  ${
            sum ? "opacity-100" : "opacity-0"
          } transition-all transition-2s`}
        >
          <div>
            {sum && (
              <ul className="flex flex-col gap-6 ">
                {sum.content
                  .split("~")
                  .filter((i) => i !== "")
                  .map((p) => (
                    <li key={p}>➤ {p}</li>
                  ))}
              </ul>
            )}
          </div>
          <ul className="flex flex-col gap-6">
            {response ? (
              response?.content
                .split("~")
                .filter((i) => i !== "")
                .map((p) => (
                  <li key={p} className="">
                    🔴 <span className="font-semibold">{p}</span>
                  </li>
                ))
            ) : (
              <div>Loading remedies...</div>
            )}
          </ul>
        </div>
        {/* <div className='w-2/3 flex justify-center items-center '><img src="/doctor.svg" alt="" /> </div> */}
      </div>
    </>
  );
};

export default Checkup;
