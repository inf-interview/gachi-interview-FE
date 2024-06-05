import customFetcher from "@/utils/customFetcher";

export interface DeleteWorkbookRequest {
  userId: number;
  workbookId: number;
}

export const deleteWorkbook = async ({ userId, workbookId }: DeleteWorkbookRequest) => {
  const { response } = await customFetcher(`/workbook/${workbookId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!response) {
    throw new Error("Failed to delete workbook");
  }

  return response;
};

export default deleteWorkbook;
