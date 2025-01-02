import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './styles';

const newCycleFormValidationSchema = z.object({
	task: z.string().min(1, 'Informe a tarefa'),
	minutesAmount: z
		.number()
		.min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
		.max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

export function Home() {
	const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 5
		}
	});

	function handleCreateNewCycle(data: NewCycleFormData) {
		console.log(data);
		reset();
	}

	const task = watch('task');
	const isSubmitDisabled = !task;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<FormContainer>
					<label htmlFor="task">Vou trabalhar em</label>
					<TaskInput
						type="text"
						id="task"
						placeholder="Dê um nome para o seu projeto"
						list="taks-suggestions"
						{...register('task')}
					/>

					<datalist id="taks-suggestions">
						<option value="Projeto 01" />
						<option value="Projeto 02" />
						<option value="Projeto 03" />
						<option value="Projeto 04" />
					</datalist>

					<label htmlFor="minutesAmount">durante</label>
					<MinutesAmountInput
						type="number"
						id="minutesAmount"
						placeholder="00"
						step={5}
						min={5}
						max={60}
						{...register('minutesAmount', { valueAsNumber: true })}
					/>

					<span>minutos.</span>
				</FormContainer>

				<CountdownContainer>
					<span>0</span>
					<span>0</span>
					<Separator>:</Separator>
					<span>0</span>
					<span>0</span>
				</CountdownContainer>

				<StartCountdownButton type="submit" disabled={isSubmitDisabled}>
					<Play size={24} />
					Começar
				</StartCountdownButton>
			</form>
		</HomeContainer>
	);
}
