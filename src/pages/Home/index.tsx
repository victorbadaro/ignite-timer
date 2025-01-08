import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from '@phosphor-icons/react';
import { createContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';

import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

interface CyclesContextType {
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	amountSecondsPassed: number;
	markCurrentCycleAsFinished: () => void;
	setSecondsPassed: (seconds: number) => void;
}

const newCycleFormValidationSchema = z.object({
	task: z.string().min(1, 'Informe a tarefa'),
	minutesAmount: z
		.number()
		.min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
		.max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
	const newCycleForm = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 5
		}
	});
	const { handleSubmit, watch, reset } = newCycleForm;

	const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

	function setSecondsPassed(seconds: number) {
		setAmountSecondsPassed(seconds);
	}

	function markCurrentCycleAsFinished() {
		setCycles(state => state.map(cycle => {
			if (cycle.id === activeCycleId) {
				return { ...cycle, finishedDate: new Date() };
			}

			return cycle;
		}));
	}

	function handleCreateNewCycle(data: NewCycleFormData) {
		const id = String(new Date().getTime());
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date()
		};

		setCycles(state => [...state, newCycle]);
		setActiveCycleId(id);
		setAmountSecondsPassed(0);
		reset();
	}

	function handleInterruptCycle() {
		setCycles(state => state.map(cycle => {
			if (cycle.id === activeCycleId) {
				return { ...cycle, interruptedDate: new Date() };
			}

			return cycle;
		}));

		setActiveCycleId(null);
	}

	const task = watch('task');
	const isSubmitDisabled = !task;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed }}>
					<FormProvider {...newCycleForm}>
						<NewCycleForm />
					</FormProvider>
					<Countdown />
				</CyclesContext.Provider>

				{activeCycle ? (
					<StopCountdownButton type="button" onClick={handleInterruptCycle}>
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
