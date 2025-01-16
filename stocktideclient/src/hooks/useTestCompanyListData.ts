// 커스텀 훅 정의
function useTestCompanyListData() {

  return {
    data: extractedData,
    isLoading,
    isError,
  };
}

export default useTestCompanyListData;
