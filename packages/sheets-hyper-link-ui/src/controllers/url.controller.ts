/**
 * Copyright 2023-present DreamNum Inc.
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

import { Disposable, LifecycleStages, OnLifecycle } from '@univerjs/core';
import { Inject } from '@wendellhu/redi';
import { SheetsHyperLinkResolverService } from '../services/resolver.service';

@OnLifecycle(LifecycleStages.Rendered, SheetHyperLinkUrlController)
export class SheetHyperLinkUrlController extends Disposable {
    constructor(
        @Inject(SheetsHyperLinkResolverService) private _resolverService: SheetsHyperLinkResolverService
    ) {
        super();
        this._handleInitUrl();
    }

    private _handleInitUrl() {
        const hash = location.hash;
        if (hash) {
            const linkInfo = this._resolverService.parseHyperLink(hash);
            linkInfo.handler();
        }
    }
}
