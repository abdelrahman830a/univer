import type { ICommandInfo, IMutation } from '@univerjs/core';
import { CommandType } from '@univerjs/core';
import type { IAccessor } from '@wendellhu/redi';

export interface ISetFormulaCalculationStartMutation {
    commands: ICommandInfo[];
}

export const setFormulaCalculationStartMutation: IMutation<ISetFormulaCalculationStartMutation> = {
    id: 'formula.mutation.set-formula-calculation-start',
    type: CommandType.MUTATION,
    handler: (accessor: IAccessor, params: ISetFormulaCalculationStartMutation) => true,
};

export interface ISetFormulaCalculationStopMutation {}

export const setFormulaCalculationStopMutation: IMutation<ISetFormulaCalculationStopMutation> = {
    id: 'formula.mutation.set-formula-calculation-stop',
    type: CommandType.MUTATION,
    handler: (accessor: IAccessor, params: ISetFormulaCalculationStopMutation) => true,
};