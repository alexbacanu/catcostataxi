"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconSend } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { Dictionary } from "@/lib/locale/get-dictionary";
import LoadingAnimation from "@/ui/loading-animation";

type Props = {
  dictionary: Dictionary;
  lang: string;
};

export default function ContactForm({ dictionary, lang }: Props) {
  // Zod
  const zodSchema = z.object({
    firstName: z.string().min(1, { message: dictionary.contact.zod_required }),
    lastName: z.string().min(1, { message: dictionary.contact.zod_required }),
    email: z.string().min(1, { message: dictionary.contact.zod_required }).email({
      message: dictionary.contact.zod_valid,
    }),
    message: z.string().min(1, { message: dictionary.contact.zod_required }),
    terms: z.boolean().refine((val) => val === true, {
      message: dictionary.contact.zod_agree,
    }),
    hcaptcha: z.string().min(1, { message: dictionary.contact.zod_required }),
  });

  type ValidationSchema = z.infer<typeof zodSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(zodSchema),
  });

  // HCaptcha
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const onCaptchaChange = (token: string) => {
    setCaptchaToken(token);
  };

  const onSubmit = async (data: ValidationSchema) => {
    if (!captchaToken) return;

    try {
      const response = await fetch(`/${lang}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error(response.status, response.statusText);
        throw new Error("Network response was not ok.");
      }

      // Reset captcha
      captchaRef.current?.resetCaptcha();

      // Reset form
      reset();
      toast.success(dictionary.contact.success, { duration: 7000 });
    } catch (error) {
      toast.error(dictionary.contact.error, { duration: 7000 });
    }
  };

  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <div className="flex items-center gap-x-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-200"
            >
              {dictionary.contact.first_name}
            </label>
            {errors.firstName && <p className="text-xs italic text-red-500">{errors.firstName.message}</p>}
          </div>
          <div className="mt-1">
            <input type="text" id="name" autoComplete="name" className="input-base pl-2" {...register("firstName")} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-200"
            >
              {dictionary.contact.last_name}
            </label>
            {errors.lastName && <p className="text-xs italic text-red-500">{errors.lastName.message}</p>}
          </div>
          <div className="mt-1">
            <input type="text" id="name" autoComplete="name" className="input-base pl-2" {...register("lastName")} />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-center gap-x-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-200"
            >
              {dictionary.contact.email}
            </label>
            {errors.email && <p className="text-xs italic text-red-500">{errors.email.message}</p>}
          </div>
          <div className="mt-1">
            <input type="email" id="email" autoComplete="email" className="input-base pl-2" {...register("email")} />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-center gap-x-4">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-200"
            >
              {dictionary.contact.message}
            </label>
            {errors.message && <p className="text-xs italic text-red-500">{errors.message.message}</p>}
          </div>
          <div className="mt-1">
            <textarea
              id="message"
              rows={4}
              className="input-base h-auto py-2 pl-2"
              defaultValue={""}
              {...register("message")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-sm">
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row">
          <div className="flex w-full flex-col">
            <div>
              <input id="terms" className="h-4 w-4" type="checkbox" {...register("terms")} />
              <span className="w-auto px-2">
                {dictionary.contact.agree_1}
                <Link className="text-amber-500" href={`${lang}/privacy`}>
                  {dictionary.root.footer.privacy}
                </Link>
                {dictionary.contact.agree_2}
                <Link className="text-amber-500" href={`${lang}/terms`}>
                  {dictionary.root.footer.terms}
                </Link>
              </span>
              {errors.terms && <span className="text-xs italic text-red-500">{errors.terms.message}</span>}
            </div>
          </div>
          <div className="flex flex-col">
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""}
              onVerify={(token) => {
                onCaptchaChange(token);
                setValue("hcaptcha", token, { shouldValidate: true });
              }}
              languageOverride={lang}
              ref={captchaRef}
              theme="light"
            />
            {errors.hcaptcha && <p className="text-xs italic text-red-500">{errors.hcaptcha.message}</p>}
          </div>
        </div>
      </div>
      <div className="flex items-center ">
        <button
          type="submit"
          className="button-base button-primary flex w-full items-center gap-x-2 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoadingAnimation />
            </>
          ) : (
            <>
              <IconSend />
              <span>{dictionary.contact.send}</span>
            </>
          )}
        </button>
      </div>
      <Toaster />
    </form>
  );
}
