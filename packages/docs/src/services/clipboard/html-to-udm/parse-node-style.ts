import { TinyColor } from '@ctrl/tinycolor';
import type { ITextStyle } from '@univerjs/core';
import { BaselineOffset, BooleanNumber } from '@univerjs/core';

import { ptToPixel } from './utils';

export function extractNodeStyle(node: HTMLElement): ITextStyle {
    const styles = node.style;
    const docStyles: ITextStyle = {};
    const tagName = node.tagName.toLowerCase();

    switch (tagName) {
        case 'b':
        case 'em':
        case 'strong': {
            docStyles.bl = BooleanNumber.TRUE;
            break;
        }

        case 's': {
            docStyles.st = {
                s: BooleanNumber.TRUE,
            };
            break;
        }

        case 'u': {
            docStyles.ul = {
                s: BooleanNumber.TRUE,
            };
            break;
        }

        case 'i': {
            docStyles.it = BooleanNumber.TRUE;
            break;
        }

        case 'sub':
        case 'sup': {
            docStyles.va = tagName === 'sup' ? BaselineOffset.SUPERSCRIPT : BaselineOffset.SUBSCRIPT;
            break;
        }
    }

    for (let i = 0; i < styles.length; i++) {
        const cssRule = styles[i];
        const cssValue = styles.getPropertyValue(cssRule);

        switch (cssRule) {
            case 'font-family': {
                docStyles.ff = cssValue;

                break;
            }

            case 'font-size': {
                const fontSize = parseInt(cssValue);

                if (!Number.isNaN(fontSize)) {
                    // TODO: @JOCS, hand other CSS value unit, rem, em, pt, %
                    docStyles.fs = /pt$/.test(cssValue) ? ptToPixel(fontSize) : fontSize;
                }

                break;
            }

            case 'font-style': {
                if (cssValue === 'italic') {
                    docStyles.it = BooleanNumber.TRUE;
                }

                break;
            }

            case 'font-weight': {
                const MIDDLE_FONT_WEIGHT = 400;

                if (Number(cssValue) > MIDDLE_FONT_WEIGHT) {
                    docStyles.bl = BooleanNumber.TRUE;
                }

                break;
            }

            case 'text-decoration': {
                // TODO: @JOCS， Parse CSS values like: underline dotted;
                if (/underline/.test(cssValue)) {
                    docStyles.ul = {
                        s: BooleanNumber.TRUE,
                    };
                } else if (/overline/.test(cssValue)) {
                    docStyles.ol = {
                        s: BooleanNumber.TRUE,
                    };
                } else if (/line-through/.test(cssValue)) {
                    docStyles.st = {
                        s: BooleanNumber.TRUE,
                    };
                }

                break;
            }

            case 'color': {
                const color = new TinyColor(cssValue);

                if (color.isValid) {
                    docStyles.cl = {
                        rgb: color.toRgbString(),
                    };
                }

                break;
            }

            case 'background-color': {
                const color = new TinyColor(cssValue);

                if (color.isValid) {
                    docStyles.bg = {
                        rgb: color.toRgbString(),
                    };
                }

                break;
            }

            default: {
                // console.log(`Unhandled css rule ${cssRule}`);
                break;
            }
        }
    }

    return docStyles;
}