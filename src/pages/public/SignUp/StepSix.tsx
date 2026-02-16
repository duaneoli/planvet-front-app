import { UseBrasilApiService } from "@/api/use/UseBrasilApi";
import { Input } from "@/components/DataInput/Input";
import { Select } from "@/components/DataInput/Select";
import { Form } from "@/components/form";
import { maskCep } from "@/hooks/mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const signUpSchema = z
  .object({
    street: z.string().min(3, "Nome da rua muito curto"),
    streetNumber: z.string().min(0, "Digite um número valido"),
    streetComplement: z.string().min(3, "Digite um complemento valido"),
    neighborhood: z.string().min(3, "Informe um bairro valido"),
    cep: z.string().min(9, "Cep inválido"),
    city: z.string().min(3, "Cididade inválida"),
    state: z.string().min(2, "Estado inválido").max(2, "Estado inválido").toUpperCase(),
  })
  .refine(
    (data) => {
      return data.streetNumber && parseInt(data.streetNumber) > 0;
    },
    { path: ["streetNumber"], message: "Informe um número válido maior que Zero" }
  );

type SignUpForm = z.infer<typeof signUpSchema>;

export function StepSix(props: {
  onNext: (data: SignUpForm) => void;
  defaultValues?: Partial<SignUpForm>;
}) {
  const [allowedManualEdit, setAllowedManualEdit] = useState(false);
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const formData = watch();

  const {
    data: cepRequestData,
    isError,
    isFetched,
  } = UseBrasilApiService.useGetAddressByCep(formData.cep);

  const {
    data: stateRequestData,
    refetch: refetchStateData,
    isLoading: stateLoading,
  } = UseBrasilApiService.useGetStates();

  const { data: cityRequestData, isLoading: cityLoading } = UseBrasilApiService.useGetCities(
    formData.state
  );

  useEffect(() => {
    if (cepRequestData) {
      setValue("city", cepRequestData.city || "");
      setValue("state", cepRequestData.state || "");
      setValue("neighborhood", cepRequestData.neighborhood || "");
      setValue("street", cepRequestData.street || "");
      setAllowedManualEdit(false);
    }
  }, [cepRequestData, setValue]);

  useEffect(() => {
    if (isError) {
      toast.error("Endereço não localizado, por favor digital manualmente");
      refetchStateData();
      setAllowedManualEdit(true);
    }
  }, [isError]);

  console.log(formData);

  return (
    <Form
      handleSubmit={handleSubmit(props.onNext)}
      rigthButton={{
        isLoading: isSubmitting,
        text: "Próximo Passo",
        iconRight: <ArrowRight size={20} />,
      }}
    >
      <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Crie sua conta</h1>
          <p className="text-slate-500 text-sm">Insira seus dados para começar a proteção.</p>
        </div>

        <Input
          label="Cep"
          icon={<User size={18} />}
          placeholder="00000-000"
          error={errors.cep?.message}
          {...register("cep")}
          onChange={(e) => {
            setValue("cep", maskCep(e.target.value));
          }}
        />
        {!isFetched && (
          <span className="text-[12px] text-slate-500">
            Digite o seu cep para encontrar seu endereço.
          </span>
        )}

        <div className={`grid lg:grid-cols-5 sm:grid-cols-1 gap-4 ${!isFetched ? "hidden" : ""}`}>
          <div className="lg:col-span-4">
            <Input
              label="Rua/Avenida"
              disabled={!allowedManualEdit}
              icon={<User size={18} />}
              placeholder="Avenida Brasil"
              error={errors.street?.message}
              {...register("street")}
            />
          </div>
          <Input
            label="Numero"
            icon={<User size={18} />}
            placeholder="12012"
            error={errors.streetNumber?.message}
            {...register("streetNumber")}
            onChange={(e) => {
              const n = e.target.value.replace(/\D/g, "");
              setValue("streetNumber", parseInt(n) ? n : "");
            }}
          />
        </div>
        <div className={`grid lg:grid-cols-5 sm:grid-cols-1 gap-4 ${!isFetched ? "hidden" : ""}`}>
          <div className="lg:col-span-2">
            <Input
              label="Complemento"
              icon={<User size={18} />}
              placeholder="Casa, apartamento"
              error={errors.streetComplement?.message}
              {...register("streetComplement")}
            />
          </div>
          <div className="lg:col-span-3">
            <Input
              label="Bairro"
              disabled={!allowedManualEdit}
              icon={<User size={18} />}
              placeholder="Centro"
              error={errors.neighborhood?.message}
              {...register("neighborhood")}
            />
          </div>
        </div>
        <div className={`grid lg:grid-cols-2 sm:grid-cols-1 gap-4 ${!isFetched ? "hidden" : ""}`}>
          {allowedManualEdit ? (
            <Select
              label="Estado"
              placeholder="Selecione um estado..."
              disabled={stateLoading}
              options={stateRequestData.map((it) => ({
                value: it.sigla,
                label: it.nome,
              }))}
              {...register("state")}
            />
          ) : (
            <Input
              label="Estado"
              disabled={!allowedManualEdit}
              icon={<User size={18} />}
              placeholder="São Paulo"
              error={errors.state?.message}
              {...register("state")}
            />
          )}

          {allowedManualEdit ? (
            <Select
              label="Cidade"
              placeholder={
                !formData.state ? "Selecione um estado primeiro" : "Selecione uma cidade..."
              }
              disabled={cityLoading || !formData.state}
              options={
                cityRequestData
                  ? cityRequestData.map((it) => ({
                      value: it.nome,
                      label: it.nome,
                    }))
                  : []
              }
              {...register("city")}
            />
          ) : (
            <Input
              label="Cidade"
              disabled={!allowedManualEdit}
              icon={<User size={18} />}
              placeholder="São Paulo"
              error={errors.city?.message}
              {...register("city")}
            />
          )}
        </div>
      </div>
    </Form>
  );
}
