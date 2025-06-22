const GenerateUrl = (url: string, ...parameter: string[]): string => {
  return url + "?" + parameter.join("&");
};

export default GenerateUrl;
