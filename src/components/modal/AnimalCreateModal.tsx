import { UseAnimalService } from "@/hooks/planvet/UseAnimal";
import { UseBreedService } from "@/hooks/planvet/UseBreed";
import { UseSpeciesService } from "@/hooks/planvet/UseSpecies";
import { Form } from "@/components/DataInput/Form";
import { Input } from "@/components/DataInput/Input";
import { Select } from "@/components/DataInput/Select";
import Modal from "@/components/modal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { Calendar, Dog } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const animalSchema = z
  .object({
    name: z.string().min(2, "Nome do pet é obrigatório"),
    birthDate: z.string(),
    specieId: z.string().min(1, "Selecione uma espécie"),
    breedId: z.string().min(1, "Selecione a raça"),
  })
  .refine(
    (data) => {
      const d = dayjs(data.birthDate, "YYYY-MM-DD");
      return d.isValid() && d.isBefore(dayjs().add(1, "day"), "day");
    },
    { path: ["birthDate"], message: "Data deve ser menor ou igual a hoje" }
  )
  .refine(
    (data) => {
      const d = dayjs(data.birthDate, "YYYY-MM-DD");
      return d.isValid() && d.isAfter(dayjs("1990-01-01"), "day");
    },
    { path: ["birthDate"], message: "Data deve ser maior que 01/01/1990" }
  );

type AnimalFormType = z.infer<typeof animalSchema>;

interface AnimalCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (id: number) => void;
}

export function AnimalCreateModal({ isOpen, onClose, onCreated }: AnimalCreateModalProps) {
  const { mutateAsync: createAnimal } = UseAnimalService.useCreate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AnimalFormType>({
    resolver: zodResolver(animalSchema),
    mode: "onChange",
  });

  const specieId = watch("specieId");

  const { data: species = [], isLoading: speciesLoading } = UseSpeciesService.useGetAll();
  const { data: breeds = [], isLoading: breedsLoading } = UseBreedService.useGetBySpecie(
    Number(specieId)
  );

  const onSubmit = async (data: AnimalFormType) => {
    try {
      const animal = await createAnimal({
        name: data.name,
        birthDate: data.birthDate,
        specieId: Number(data.specieId),
        breedId: Number(data.breedId),
      });
      toast.success("Animal cadastrado com sucesso!");
      reset();
      onClose();
      onCreated?.(animal.id);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message ?? "Erro ao cadastrar animal. Tente novamente.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar Animal">
      <div className="w-full min-w-[320px] sm:min-w-[480px]">
        <Form
          handleSubmit={handleSubmit(onSubmit)}
          rigthButton={{ isLoading: isSubmitting, text: "Cadastrar" }}
          leftButton={{ text: "Cancelar", onClick: onClose }}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nome do Pet"
                icon={<Dog size={18} />}
                placeholder="Ex: Luna"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label="Data de Nascimento"
                icon={<Calendar size={18} />}
                type="date"
                error={errors.birthDate?.message}
                {...register("birthDate")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="specieId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Espécie"
                    placeholder="Selecione..."
                    disabled={speciesLoading}
                    options={species.map(({ id, name }) => ({ value: id, label: name }))}
                    errorsMessage={errors.specieId?.message}
                  />
                )}
              />
              <Controller
                name="breedId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Raça"
                    placeholder={specieId ? "Selecione..." : "Selecione a espécie primeiro"}
                    disabled={breedsLoading || !specieId}
                    options={breeds.map(({ id, name }) => ({ value: id, label: name }))}
                    errorsMessage={errors.breedId?.message}
                  />
                )}
              />
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
