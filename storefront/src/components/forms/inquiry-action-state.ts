export type InquiryActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialInquiryActionState: InquiryActionState = {
  status: "idle",
  message: "",
};
