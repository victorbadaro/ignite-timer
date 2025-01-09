import { CyclesContext } from '@/contexts/CyclesContext';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

export function NewCycleForm() {
	const { activeCycle } = useContext(CyclesContext);
	const { register } = useFormContext();

	return (
		<FormContainer>
			<label htmlFor="task">Vou trabalhar em</label>
			<TaskInput
				type="text"
				id="task"
				placeholder="Dê um nome para o seu projeto"
				list="taks-suggestions"
				disabled={!!activeCycle}
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
				disabled={!!activeCycle}
				{...register('minutesAmount', { valueAsNumber: true })}
			/>

			<span>minutos.</span>
		</FormContainer>
	);
}
