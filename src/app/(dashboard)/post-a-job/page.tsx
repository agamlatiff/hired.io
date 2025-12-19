"use client";

import CKEditor from "@/components/dashboard/CKEditor";
import FieldInput from "@/components/dashboard/FieldInput";
import InputBenefits from "@/components/dashboard/InputBenefits";
import InputSkills from "@/components/dashboard/InputSkills";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { JOBTYPES } from "@/constants";
import { jobFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import type { CategoryJob } from "@prisma/client";
import Applicants from "@/components/dashboard/Applicants";
import { useSession } from "next-auth/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const PostJobPage = () => {
  const { data, error, isLoading } = useSWR<CategoryJob[]>(
    "/api/job/categories",
    fetcher
  );
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      requiredSkills: [],
    },
  });

  const { data: session } = useSession();
  const { toast } = useToast();

  const router = useRouter();

  const onSubmit = async (val: z.infer<typeof jobFormSchema>) => {
    try {
      const body: any = {
        applicants: 0,
        benefits: val.benefits,
        categoryId: val.categoryId,
        companyId: session?.user.id!!,
        datePosted: moment().toDate(),
        description: val.jobDescription,
        dueDate: moment().add(1, "M").toDate(),
        jobType: val.jobType,
        needs: 20,
        niceToHaves: val.niceToHaves,
        requiredSkills: val.requiredSkills,
        responsibility: val.responsibility,
        roles: val.roles,
        salaryFrom: val.salaryFrom,
        salaryTo: val.salaryTo,
        whoYouAre: val.whoYouAre,
      };

      await fetch("/api/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      await router.push("/job/listings");
    } catch (error) {
      toast({
        title: "Error",
        description: "Please try again",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div>
      <div className="inline-flex items-center gap-2 cursor-pointer hover:text-primary">
        <ArrowLeftIcon className="size-7" />
        <span className="text-2xl font-semibold">Post a Job</span>
      </div>

      <div className="my-5">
        <div className="text-lg font-semibold">Basic Information</div>
        <div className="text-gray-400">
          List out your top perks and benefits.
        </div>
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 space-y-6 pt-6"
        >
          <FieldInput
            title="Job Title"
            subtitle="Job title must be describe one position"
          >
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="e.g. Software Engineer"
                      {...field}
                      className="w-[450px]"
                    />
                  </FormControl>
                  <FormDescription>At least 10 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>

          <FieldInput
            title="Type of Employment"
            subtitle="You can select multiple type of employment"
          >
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      {JOBTYPES.map((item: string, i: number) => (
                        <FormItem
                          key={item + i}
                          className="flex items-center gap-3"
                        >
                          <FormControl>
                            <RadioGroupItem value={item} />
                          </FormControl>
                          <FormLabel className="font-normal">{item}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>

          <FieldInput
            title="Salary"
            subtitle="Please specify the estimated salary range for the role"
          >
            <div className="w-[450px] flex flex-row justify-between ">
              <FormField
                control={form.control}
                name="salaryFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="$100" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-center"> </span>
              <FormField
                control={form.control}
                name="salaryTo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="$1000"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FieldInput>

          <FieldInput
            title="Categories"
            subtitle="You can select job categories"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Job Categorie</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[450px]">
                        <SelectValue placeholder="Select Job Categories" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.map((item: CategoryJob) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>

          <FieldInput
            title="Required Skills"
            subtitle="Add Required skills for the job"
          >
            <InputSkills form={form} name="requiredSkills" label="Add Skills" />
          </FieldInput>

          <FieldInput
            title="Job Descriptions"
            subtitle="Job titles must be describe one position"
          >
            <CKEditor
              editorLoaded={editorLoaded}
              form={form}
              name={"jobDescription"}
            />
          </FieldInput>

          <FieldInput
            title="Responsibilities"
            subtitle="Outline the core responsibilities of the position"
          >
            <CKEditor
              editorLoaded={editorLoaded}
              form={form}
              name={"responsibility"}
            />
          </FieldInput>

          <FieldInput
            title="Who You Are"
            subtitle="Add your preferred candidates qualifications"
          >
            <CKEditor
              editorLoaded={editorLoaded}
              form={form}
              name={"whoYouAre"}
            />
          </FieldInput>

          <FieldInput
            title="Nice-To-Haves"
            subtitle="Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates "
          >
            <CKEditor
              editorLoaded={editorLoaded}
              form={form}
              name={"niceToHaves"}
            />
          </FieldInput>

          <FieldInput
            title="Perks and Benefits"
            subtitle="Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees"
          >
            <InputBenefits form={form} />
          </FieldInput>

          <div className="flex justify-end">
            <Button size={"lg"}>Do a Review</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostJobPage;
