import { useHistory } from "react-router-dom";

const useErrorCatcher = () => {
  const history = useHistory();

  const doErrorCatcher = (err: any) => {
    console.log("doErrorCatcher : err");

    console.log(err);

    let errorMsg = err.response?.data?.message
      ? err.response.data.message
      : "Unhandled server side message?";
    let errorStatusCode = err.response?.data?.statusCode
      ? err.response.data.statusCode
      : 503;

    if (window.location.pathname !== "/error") {
      if (history) {
        history.replace(history.location.pathname, {
          errorStatusCode: errorStatusCode,
          errorMsg: errorMsg,
        });
      } else {
        window.location.replace("/error");
      }
    }
  };

  return [doErrorCatcher];
};

export default useErrorCatcher;
