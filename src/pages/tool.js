import React, { useRef, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";

function Dropzone(props) {
  const [, setFile] = useState([]);
  const downloadFileref = useRef();
  const [json, setJson] = useState([]);
  const [fileName, setFilename] = useState("");
  const downloadFile = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(json)
    )}`;
    downloadFileref.current.setAttribute("href", dataStr);
    downloadFileref.current.setAttribute("download", `${fileName}.json`);
    downloadFileref.current.click();
  };
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    onDrop: (acceptedFile) => {
      setFilename(acceptedFile[0].name.replace("-quiz.md", ""));
      acceptedFile[0].text().then((data, k) => {
        const questionsSet = data.split("###");
        const result = [];
        const topic = questionsSet.shift();
        questionsSet.forEach((x, j) => {
          let question;
          let questionWithAnswers;
          if (x.includes("```")) {
            const temp1 = x.split("```");
            question = `${[temp1[0], temp1[1]].join("```")}\n\`\`\``;
            questionWithAnswers = temp1[2].split("\n").filter((y) => y);
          } else {
            questionWithAnswers = x.split("\n").filter((y) => y);
            question = questionWithAnswers[0];
            questionWithAnswers.shift();
          }
          const options = [];
          let anwserIndex;
          let answerText;

          for (let i = 0; i < questionWithAnswers.length; i++) {
            if (questionWithAnswers[i].includes("- [x] ")) {
              anwserIndex = i;
              answerText = questionWithAnswers[i].replace("- [x] ", "");
              if (answerText[0] === "`") {
                answerText = answerText.substring(1);
              }
              if (answerText[answerText.length - 1] === "`") {
                answerText = answerText.substring(0, answerText.length - 1);
              }
              options.push(answerText);
            } else {
              let option = questionWithAnswers[i].replace("- [ ] ", "");
              if (option[0] === "`") {
                option = option.substring(1);
              }
              if (option[option.length - 1] === "`") {
                option = option.substring(0, option.length - 1);
              }
              options.push(option);
            }
          }
          result.push({
            question,
            options,
            anwserIndex,
            answerText,
          });
        });
        setJson(result);
      });
      setFile(acceptedFile);
    },
    noClick: true,
    noKeyboard: true,
  });

  const files = acceptedFiles.map((f) => (
    <li key={f.path}>
      {f.path} -{f.size} bytes
    </li>
  ));

  return (
    <Box className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Typography>
          Download Any Md file from{" "}
          <a
            target="blank"
            href="https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes"
          >
            linkedin-skill-assessments-quizzes
          </a>
        </Typography>
        <p>Drag drop some files here</p>
        <button type="button" onClick={open}>
          Open File Dialog
        </button>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
      <TextField
        label="Enter File Name"
        value={fileName}
        onChange={(e) => {
          setFilename(e.target.value);
        }}
        variant="outlined"
      />
      <Box mt={2}>
        <Button color="primary" variant="contained" onClick={downloadFile}>
          Download JSON
        </Button>
      </Box>

      <a
        id="downloadAnchorElem"
        style={{ display: "none" }}
        ref={downloadFileref}
      >
        text
      </a>
    </Box>
  );
}

const MarkdownToJSON = () => {
  return (
    <Container>
      <Head>
        <title>Khelo Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box mt={2}>
        <Typography variant="h2">Markdown To JSON</Typography>

        <Box>
          <Dropzone />
        </Box>
      </Box>
    </Container>
  );
};

export default MarkdownToJSON;
