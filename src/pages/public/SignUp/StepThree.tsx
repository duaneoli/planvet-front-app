import { UseBreedService } from "@/api/use/UseBreed";
import { UseSpeciesService } from "@/api/use/UseSpecies";
import { Input } from "@/components/DataInput/Input";
import { Select } from "@/components/DataInput/Select";
import { Form } from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { ArrowRight, Calendar, ChevronLeft, Dog } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const stepThreeSchema = z
  .object({
    petName: z.string().min(2, "Nome do pet é obrigatório"),
    petBirthDate: z.string(),
    petSpecies: z.string().min(1, "Selecione uma espécie"),
    petBreed: z.string().min(1, "Selecione a raça"),
  })
  .refine(
    (data) => {
      const birthDate = dayjs(data.petBirthDate, "YYYY-MM-DD");
      return birthDate.isValid() && birthDate.isBefore(dayjs().add(1, "day"), "day");
    },
    { path: ["petBirthDate"], message: "Necessario selecionar uma data menor ou igual a hoje" }
  )
  .refine(
    (data) => {
      const birthDate = dayjs(data.petBirthDate, "YYYY-MM-DD");
      return birthDate.isValid() && birthDate.isAfter(dayjs("1990-01-01"), "day");
    },
    { path: ["petBirthDate"], message: "Necessario selecionar uma data maior que 01-01-1990" }
  );
type StepThreeFormType = z.infer<typeof stepThreeSchema>;

export function StepThree(props: {
  defaultValues?: Partial<StepThreeFormType>;
  onNext: (data: StepThreeFormType) => void;
  onPrevious: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StepThreeFormType>({
    resolver: zodResolver(stepThreeSchema),
    mode: "onChange",
    defaultValues: props.defaultValues || {},
  });

  const formData = watch();
  console.log(formData);

  const { data: speciesServiceData, isLoading: speciesServiceLoading } =
    UseSpeciesService.useGetAll();

  const {
    data: breedServiceData,
    isLoading: breedServiceLoading,
    refetch,
  } = UseBreedService.useGetBySpecie(Number(formData.petSpecies));

  useEffect(() => {
    refetch();
  }, [formData.petSpecies]);

  return (
    <Form
      handleSubmit={handleSubmit(props.onNext)}
      rigthButton={{
        isLoading: isSubmitting,
        text: "Próximo Passo",
        iconRight: <ArrowRight size={20} />,
      }}
      leftButton={{
        text: "Voltar",
        iconLeft: <ChevronLeft size={20} />,
        onClick: props.onPrevious,
      }}
    >
      <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dados do seu pet</h1>
          <p className="text-slate-500 text-sm">Como é o animal que você quer proteger ?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome do Pet"
            icon={<Dog size={30} />}
            placeholder="Ex: Luna"
            error={errors.petName?.message}
            {...register("petName")}
          />
          <Input
            label="Data de Nascimento"
            icon={<Calendar size={30} />}
            type="date"
            error={errors.petBirthDate?.message}
            {...register("petBirthDate")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            {...register("petSpecies")}
            label="Espécie"
            placeholder="Selecione uma especie..."
            disabled={speciesServiceLoading}
            options={
              speciesServiceData
                ? speciesServiceData.map(({ id, specie }) => ({
                    value: id,
                    label: specie,
                  }))
                : [{ label: "Carregando...", value: "" }]
            }
            errorsMessage={errors.petSpecies?.message}
          />
          <Select
            {...register("petBreed")}
            label="Raça"
            placeholder="Selecione uma raça..."
            disabled={breedServiceLoading}
            options={
              breedServiceData
                ? breedServiceData.map(({ breed, id }) => ({
                    value: id,
                    label: breed,
                  }))
                : [{ label: "Carregando...", value: "" }]
            }
            errorsMessage={errors.petBreed?.message}
          />
        </div>
      </div>
    </Form>
  );
}
