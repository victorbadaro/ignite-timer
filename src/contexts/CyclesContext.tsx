import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '@/reducers/cycles/actions';
import { Cycle, cyclesReducer } from '@/reducers/cycles/reducer';
import { differenceInSeconds } from 'date-fns';
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';

interface CreateCycleData {
	task: string;
	minutesAmount: number;
}

interface CyclesContextType {
	cycles: Cycle[];
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	amountSecondsPassed: number;
	markCurrentCycleAsFinished: () => void;
	setSecondsPassed: (seconds: number) => void;
	createNewCycle: (data: CreateCycleData) => void;
	interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
	children: ReactNode;
}

const CyclesContext = createContext({} as CyclesContextType);

function CyclesContextProvider({ children }: CyclesContextProviderProps) {
	const [cyclesState, dispatch] = useReducer(cyclesReducer, {
		cycles: [],
		activeCycleId: null
	}, (initialState) => {
		const storagedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');

		if (storagedStateAsJSON) {
			return JSON.parse(storagedStateAsJSON);
		}

		return initialState;
	});

	useEffect(() => {
		const stateJSON = JSON.stringify(cyclesState);

		localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON);
	}, [cyclesState]);

	const { cycles, activeCycleId } = cyclesState;
	const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

	const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
		if (activeCycle) {
			return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
		}

		return 0;
	});

	function setSecondsPassed(seconds: number) {
		setAmountSecondsPassed(seconds);
	}

	function markCurrentCycleAsFinished() {
		dispatch(markCurrentCycleAsFinishedAction());
	}

	function createNewCycle(data: CreateCycleData) {
		const id = String(new Date().getTime());
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date()
		};

		dispatch(addNewCycleAction(newCycle));
		setAmountSecondsPassed(0);
	}

	function interruptCurrentCycle() {
		dispatch(interruptCurrentCycleAction());
	}

	return (
		<CyclesContext.Provider
			value={{
				cycles,
				activeCycle,
				activeCycleId,
				markCurrentCycleAsFinished,
				amountSecondsPassed,
				setSecondsPassed,
				createNewCycle,
				interruptCurrentCycle
			}}
		>
			{children}
		</CyclesContext.Provider>
	);
}

export { CyclesContext, CyclesContextProvider };
