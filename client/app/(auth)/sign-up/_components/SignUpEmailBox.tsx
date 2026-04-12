"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "../../../../components/dynamic-inputs";
import { SignUpFooter } from "./SignUpFooter";
import { DynamicCardHeader } from "@/components/card";
import { FooterButtons } from "@/components/auth";

type EmailBoxProps = {
  values: { name: string; email: string };
  errors: { name?: string; email?: string };
  touched: { name?: boolean; email?: boolean };
  handleChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (_event: React.FocusEvent<HTMLInputElement>) => void;
  handleNext: () => void;
};

export const SignUpEmailBox = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleNext,
}: EmailBoxProps) => {
  const emailError = touched.email && errors.email;
  const nameError = touched.name && errors.name;

  const isDisabled = !values.name || !values.email || !!errors.name || !!errors.email;

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <DynamicCardHeader
        title="Create your account"
        description="Sign up to explore your favorite dishes."
      />
      <CardContent className="p-0">
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <div className="flex flex-col gap-6">
            <div className="grid items-center w-full gap-4">
              <FormInput
                name="name"
                placeholder="Full name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                inputError={nameError}
                inputErrorMessage={errors.name}
              />
              <FormInput
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                inputError={emailError}
                inputErrorMessage={errors.email}
              />
            </div>
            <FooterButtons
              buttonDisable={isDisabled}
              buttonText="Let`s Go"
            />
          </div>
        </form>
      </CardContent>
      <SignUpFooter />
    </Card>
  );
};
