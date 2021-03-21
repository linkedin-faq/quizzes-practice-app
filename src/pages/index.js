import Head from "next/head";
import Quiz from "components/Quiz";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "4rem",
    textAlign: "center",
    marginBottom: theme.spacing(),
  },

  footer: {
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Container>
      <Head>
        <title>Khelo Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography variant="h1" className={classes.title}>
          Welcome to <b>Khelo Quiz!</b>
        </Typography>

        <Quiz />
      </main>

      <footer className={classes.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
    </Container>
  );
}
