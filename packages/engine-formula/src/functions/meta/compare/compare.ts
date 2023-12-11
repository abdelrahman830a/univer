/**
 * Copyright 2023 DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ErrorType } from '../../../basics/error-type';
import { compareToken } from '../../../basics/token';
import { ErrorValueObject } from '../../../engine/other-object/error-value-object';
import type { BaseReferenceObject, FunctionVariantType } from '../../../engine/reference-object/base-reference-object';
import type { BaseValueObject } from '../../../engine/value-object/base-value-object';
import { BaseFunction } from '../../base-function';

export class Compare extends BaseFunction {
    private _compareType: compareToken = compareToken.EQUALS;

    setCompareType(token: compareToken) {
        this._compareType = token;
    }

    override calculate(variant1: FunctionVariantType, variant2: FunctionVariantType) {
        if (variant1.isErrorObject() || variant2.isErrorObject()) {
            return ErrorValueObject.create(ErrorType.VALUE);
        }

        let result;

        if (this.checkArrayType(variant1) && this.checkArrayType(variant2)) {
            result = (variant1 as BaseReferenceObject)
                .toArrayValueObject()
                .compare((variant2 as BaseReferenceObject).toArrayValueObject(), this._compareType);
        } else if (this.checkArrayType(variant1)) {
            result = (variant1 as BaseReferenceObject)
                .toArrayValueObject()
                .compare(variant2 as BaseValueObject, this._compareType);
        } else if (this.checkArrayType(variant2)) {
            result = (variant1 as BaseValueObject).compare(
                (variant2 as BaseReferenceObject).toArrayValueObject(),
                this._compareType
            );
        } else {
            result = (variant1 as BaseValueObject).compare(variant2 as BaseValueObject, this._compareType);
        }

        return result;
    }
}