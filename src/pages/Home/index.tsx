import { CyclesContext } from '@/contexts/CyclesContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from '@phosphor-icons/react';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';

import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';

const newCycleFormValidationSchema = z.object({
	task: z.string().min(1, 'Informe a tarefa'),
	minutesAmount: z
		.number()
		.min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
		.max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

export function Home() {
	const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext);
	const newCycleForm = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 5
		}
	});
	const { handleSubmit, watch, reset } = newCycleForm;

	function handleCreateNewCycle(data: NewCycleFormData) {
		createNewCycle(data);
		reset();
	}

	const task = watch('task');
	const isSubmitDisabled = !task;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>
				<Countdown />

				{activeCycle ? (
					<StopCountdownButton type="button" onClick={interruptCurrentCycle}>
						<HandPalm size={24} />
						Interromper
					</StopCountdownButton>
				) : (
					<StartCountdownButton type="submit" disabled={isSubmitDisabled}>
						<Play size={24} />
						Começar
					</StartCountdownButton>
				)}
			</form>
		</HomeContainer>
	);
}
