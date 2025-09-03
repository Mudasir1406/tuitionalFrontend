// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Grid,
//   TextField,
//   Typography,
// } from "@mui/material";

// import { leagueSpartan } from "@/app/fonts";
// import { isValidPhoneNumber } from "react-phone-number-input";
// const PhoneInput = dynamic(() => import("react-phone-number-input"), {
//   ssr: false,
// });

// import "react-phone-number-input/style.css";
// import styles from "./style.module.css";

// import { Filter_Data, getFilterData } from "@/services/filter-data/filter-data";
// import { sendEmail } from "@/services/email-service/email-service";
// import { createEmailTemplate } from "@/services/email-service/template";
// import toast from "react-hot-toast";
// import { HELLOTUITIONALEDU } from "@/utils/env";
// import { FormType } from "@/components/home/form-dialouge";
// import CustomInput from "@/components/custom-input/custom-input";
// import Input from "@/components/input/Input";
// import DropDown from "@/components/DropDown/DropDown";
// import TranslatableDropDown from "@/components/DropDown/TranslatableDropDown";
// import { isNotEmpty, isValidEmail } from "@/utils/helper";
// import { addFormData } from "@/utils/globalFunction";
// import dynamic from "next/dynamic";
// import useGeoLocation from "@/utils/slugHelper";
// import { sendForm } from "@/services/contact-form/contact-form";

// type IProps = {
//   background?: any;
// };

// const ArForm: React.FunctionComponent<IProps> = ({ background }) => {
//   const [formData, setFormData] = React.useState<FormType>({
//     FirstName: "",
//     EmailAddress: "",
//     PhoneNumber: "",
//     Grade: "",
//     Curriculum: "",
//     Subject: "",
//     message: "",
//     Browser: "",
//     country: "",
//     ip: "",
//     pageURL: "",
//     sheetName: "Lead Forms AR",
//   });
//   const [filterData, setFilterData] = useState<Filter_Data | null>(null);
//   const [loading, setLoading] = React.useState<boolean>(false);
//   const [errors, setErrors] = React.useState<Partial<FormType>>({});

//   const handleChange = (key: string, value: string | string[]) => {
//     let newErrors = { ...errors };

//     if (key === "PhoneNumber" && typeof value === "string") {
//       if (!isValidPhoneNumber(value)) {
//         console.log("رقم هاتف غير صحيح!");
//         newErrors.PhoneNumber = isValidPhoneNumber(value)
//           ? ""
//           : "رقم هاتف غير صحيح";
//         return;
//       }
//     }
//     if (key === "EmailAddress" && typeof value === "string") {
//       newErrors.EmailAddress = isValidEmail(value)
//         ? ""
//         : "عنوان بريد إلكتروني غير صحيح";
//     }
//     if (key === "FirstName" && typeof value === "string") {
//       newErrors.FirstName = isNotEmpty(value) ? "" : "لا يمكن أن يكون الاسم فارغاً";
//     }
//     if (key === "Grade" && typeof value === "string") {
//       newErrors.Grade = isNotEmpty(value) ? "" : "لا يمكن أن يكون الصف فارغاً";
//     }
//     if (key === "Curriculum" && typeof value === "string") {
//       newErrors.Curriculum = isNotEmpty(value)
//         ? ""
//         : "لا يمكن أن يكون المنهج فارغاً";
//     }
//     if (key === "Subject" && typeof value === "string") {
//       newErrors.Subject = isNotEmpty(value) ? "" : "المواد لا يمكن أن تكون فارغة";
//     }
//     if (key === "message" && typeof value === "string") {
//       newErrors.message = isNotEmpty(value) ? "" : "لا يمكن أن تكون الرسالة فارغة";
//     }

//     setFormData({
//       ...formData,
//       [key]: value,
//     });

//     setErrors(newErrors);
//   };

//   const location :any = useGeoLocation();

//   useEffect(() => {
//     const getFilter = async () => {
//       const data = await getFilterData();
//       setFilterData(data);
//     };
//     getFilter();
//   }, []);

//   useEffect(() => {
//     if (location?.country && location?.ipAddress) {
//       setFormData((prev) => ({
//         ...prev,
//         country: location.country,
//         ip: location.ipAddress,
//         pageURL: window.location.href,
//         Browser: navigator.userAgent,
//       }));
//     }
//   }, [location]);

//   const isFormValid = (): boolean => {
//     const requiredFields: (keyof FormType)[] = [
//       "FirstName",
//       "EmailAddress", 
//       "PhoneNumber",
//       "Grade",
//       "Curriculum",
//       "Subject",
//       "message",
//     ];

//     const newErrors: Partial<FormType> = {};

//     requiredFields.forEach((field) => {
//       const value = formData[field];
//       if (!value || (typeof value === "string" && value.trim() === "")) {
//         switch (field) {
//           case "FirstName":
//             newErrors[field] = "لا يمكن أن يكون الاسم فارغاً";
//             break;
//           case "EmailAddress":
//             newErrors[field] = "لا يمكن أن يكون البريد الإلكتروني فارغاً";
//             break;
//           case "PhoneNumber":
//             newErrors[field] = "لا يمكن أن يكون رقم الهاتف فارغاً";
//             break;
//           case "Grade":
//             newErrors[field] = "لا يمكن أن يكون الصف فارغاً";
//             break;
//           case "Curriculum":
//             newErrors[field] = "لا يمكن أن يكون المنهج فارغاً";
//             break;
//           case "Subject":
//             newErrors[field] = "المواد لا يمكن أن تكون فارغة";
//             break;
//           case "message":
//             newErrors[field] = "لا يمكن أن تكون الرسالة فارغة";
//             break;
//         }
//       }
//     });

//     if (!isValidEmail(formData.EmailAddress)) {
//       newErrors.EmailAddress = "عنوان بريد إلكتروني غير صحيح";
//     }

//     if (!isValidPhoneNumber(formData.PhoneNumber)) {
//       newErrors.PhoneNumber = "رقم هاتف غير صحيح";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!isFormValid()) {
//       toast.error("يرجى ملء جميع الحقول المطلوبة بشكل صحيح");
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const response:any = await sendForm(formData);
//       if (response.success) {
//         toast.success("تم إرسال النموذج بنجاح! سنتواصل معك قريباً");
//         setFormData({
//           FirstName: "",
//           EmailAddress: "",
//           PhoneNumber: "",
//           Grade: "",
//           Curriculum: "",
//           Subject: "",
//           message: "",
//           Browser: "",
//           country: location?.country || "",
//           ip: location?.ipAddress || "",
//           pageURL: window.location.href,
//           sheetName: "Lead Forms AR",
//         });
//       } else {
//         toast.error("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={[styles.boxSection, background]} className={styles.rtlContainer}>
//       <Typography
//         className={leagueSpartan.className}
//         sx={styles.headerText as any}
//         variant="h4"
//         component="h2"
//       >
//         احجز جلسة تجريبية مجانية
//       </Typography>
      
//       <Box component="form" onSubmit={handleSubmit} sx={styles.formContainer}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Input
//               name="name"
//               placeholder="الاسم الكامل*"
//               value={formData.FirstName}
//               onChange={(e) => handleChange("FirstName", e.target.value)}
//               error={!!errors.FirstName}
//               helperText={errors.FirstName}
//               dir="rtl"
//             />
//           </Grid>
          
//           <Grid item xs={12}>
//             <Input
//               name="email"
//               type="email"
//               placeholder="البريد الإلكتروني*"
//               value={formData.EmailAddress}
//               onChange={(e) => handleChange("EmailAddress", e.target.value)}
//               error={!!errors.EmailAddress}
//               helperText={errors.EmailAddress}
//               dir="rtl"
//             />
//           </Grid>
          
//           <Grid item xs={12}>
//             <Box sx={styles.phoneInputContainer}>
//               <PhoneInput
//                 international
//                 countryCallingCodeEditable={false}
//                 defaultCountry="AE"
//                 placeholder="رقم الهاتف*"
//                 value={formData.PhoneNumber}
//                 onChange={(value) => handleChange("PhoneNumber", value || "")}
//                 className={`${styles.phoneInput} ${styles.rtlPhone}`}
//                 dir="rtl"
//               />
//               {errors.PhoneNumber && (
//                 <Typography color="error" variant="caption">
//                   {errors.PhoneNumber}
//                 </Typography>
//               )}
//             </Box>
//           </Grid>
          
//           <Grid item xs={12}>
//             <DropDown
//               placeholder="اختر الصف*"
//               options={filterData?.grades || []}
//               value={formData.Grade}
//               onChange={(value) => handleChange("Grade", value)}
//               error={!!errors.Grade}
//               helperText={errors.Grade}
//             />
//           </Grid>
          
//           <Grid item xs={12}>
//             <DropDown
//               placeholder="اختر المنهج*"
//               options={filterData?.curriculums || []}
//               value={formData.Curriculum}
//               onChange={(value) => handleChange("Curriculum", value)}
//               error={!!errors.Curriculum}
//               helperText={errors.Curriculum}
//             />
//           </Grid>
          
//           <Grid item xs={12}>
//             <TranslatableDropDown
//               name="Subject"
//               placeholder="اختر المواد*"
//               data={filterData?.subjects || []}
//               value={formData.Subject}
//               onChange={handleChange}
//               multiple
//               locale="ar"
//               isSubjectField={true}
//             />
//             {errors.Subject && (
//               <Typography
//                 className={`${leagueSpartan.className}`}
//                 sx={{ color: "red", fontSize: "0.75rem", mt: 1 }}
//                 component={"p"}
//                 variant="caption"
//               >
//                 {errors.Subject}
//               </Typography>
//             )}
//           </Grid>
          
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               multiline
//               rows={4}
//               placeholder="رسالتك (اختياري)"
//               value={formData.message}
//               onChange={(e) => handleChange("message", e.target.value)}
//               error={!!errors.message}
//               helperText={errors.message}
//               sx={styles.messageField}
//               inputProps={{ dir: "rtl" }}
//             />
//           </Grid>
          
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               fullWidth
//               disabled={loading}
//               sx={styles.submitButton}
//             >
//               {loading ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 "إرسال الآن"
//               )}
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default ArForm;