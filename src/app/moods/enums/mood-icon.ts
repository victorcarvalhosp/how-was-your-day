export enum MoodIconEnum {
    ANGRY = 'ANGRY',
    DIZZY = 'DIZZY',
    FLUSHED = 'FLUSHED',
    FROWN = 'FROWN',
    FROWN_OPEN = 'FROWN_OPEN',
    GRIMACE = 'GRIMACE',
    GRIN = 'GRIN',
    GRIN_ALT = 'GRIN_ALT',
    GRIN_BEAM = 'GRIN_BEAM',
    GRIN_BEAM_SWEAT = 'GRIN_BEAM_SWEAT',
    GRIN_HEARTS = 'GRIN_HEARTS',
    GRIN_SQUINT = 'GRIN_SQUINT',
    GRIN_SQUINT_TEARS = 'GRIN_SQUINT_TEARS',
    GRIN_STARS = 'GRIN_STARS',
    GRIN_TEARS = 'GRIN_TEARS',
    GRIN_TONGUE = 'GRIN_TONGUE',
    GRIN_TONGUE_SQUINT = 'GRIN_TONGUE_SQUINT',
    GRIN_TONGUE_WINK = 'GRIN_TONGUE_WINK',
    GRIN_WINK = 'GRIN_WINK',
    KISS = 'KISS',
    KISS_BEAM = 'KISS_BEAM',
    KISS_WINK_HEART = 'KISS_WINK_HEART',
    LAUGH = 'LAUGH',
    LAUGH_BEAM = 'LAUGH_BEAM',
    LAUGH_SQUINT = 'LAUGH_SQUINT',
    LAUGH_WINK = 'LAUGH_WINK',
    MEH = 'MEH',
    MEH_BLANK = 'MEH_BLANK',
    MEH_ROLLING_EYES = 'MEH_ROLLING_EYES',
    SAD_CRY = 'SAD_CRY',
    SAD_TEAR = 'SAD_TEAR',
    SMILE = 'SMILE',
    SMILE_BEAM = 'SMILE_BEAM',
    SMILE_WINK = 'SMILE_WINK',
    SURPRISE = 'SURPRISE',
    TIRED = 'TIRED',

}

export namespace MoodIconEnum {

    export function icon(type: MoodIconEnum) {
        switch (type) {
            case MoodIconEnum.ANGRY:
                return 'angry';
            case MoodIconEnum.DIZZY:
                return 'dizzy';
            case MoodIconEnum.FLUSHED:
                return 'flushed';
            case MoodIconEnum.FROWN:
                return 'frown';
            case MoodIconEnum.FROWN_OPEN:
                return 'frown-open';
            case MoodIconEnum.GRIMACE:
                return 'grimace';
            case MoodIconEnum.GRIN:
                return 'grin';
            case MoodIconEnum.GRIN_ALT:
                return 'grin-alt';
            case MoodIconEnum.GRIN_BEAM:
                return 'grin-beam';
            case MoodIconEnum.GRIN_BEAM_SWEAT:
                return 'grin-beam-sweat';
            case MoodIconEnum.GRIN_HEARTS:
                return 'grin-hearts';
            case MoodIconEnum.GRIN_SQUINT:
                return 'grin-squint';
            case MoodIconEnum.GRIN_SQUINT_TEARS:
                return 'grin-squint-tears';
            case MoodIconEnum.GRIN_STARS:
                return 'grin-stars';
            case MoodIconEnum.GRIN_TEARS:
                return 'grin-tears';
            case MoodIconEnum.GRIN_TONGUE:
                return 'grin-tongue';
            case MoodIconEnum.GRIN_TONGUE_SQUINT:
                return 'grin-tongue-squint';
            case MoodIconEnum.GRIN_TONGUE_WINK:
                return 'grin-tongue-wink';
            case MoodIconEnum.GRIN_WINK:
                return 'grin-wink';
            case MoodIconEnum.KISS:
                return 'kiss';
            case MoodIconEnum.KISS_BEAM:
                return 'kiss-beam';
            case MoodIconEnum.KISS_WINK_HEART:
                return 'kiss-wink-heart';
            case MoodIconEnum.LAUGH:
                return 'laugh';
            case MoodIconEnum.LAUGH_BEAM:
                return 'laugh-beam';
            case MoodIconEnum.LAUGH_SQUINT:
                return 'laugh-squint';
            case MoodIconEnum.LAUGH_WINK:
                return 'laugh-wink';
            case MoodIconEnum.MEH:
                return 'meh';
            case MoodIconEnum.MEH_BLANK:
                return 'meh-blank';
            case MoodIconEnum.MEH_ROLLING_EYES:
                return 'meh-rolling-eyes';
            case MoodIconEnum.SAD_CRY:
                return 'sad-cry';
            case MoodIconEnum.SAD_TEAR:
                return 'sad-tear';
            case MoodIconEnum.SMILE:
                return 'smile';
            case MoodIconEnum.SMILE_BEAM:
                return 'smile-beam';
            case MoodIconEnum.SMILE_WINK:
                return 'smile-wink';
            case MoodIconEnum.SURPRISE:
                return 'surprise';
            case MoodIconEnum.TIRED:
                return 'tired';
        }
    }

    export function values(): MoodIconEnum[] {
        return [
            MoodIconEnum.ANGRY,
            MoodIconEnum.DIZZY,
            MoodIconEnum.FLUSHED,
            MoodIconEnum.FROWN,
            MoodIconEnum.FROWN_OPEN,
            MoodIconEnum.GRIMACE,
            MoodIconEnum.GRIN,
            MoodIconEnum.GRIN_ALT,
            MoodIconEnum.GRIN_BEAM,
            MoodIconEnum.GRIN_BEAM_SWEAT,
            MoodIconEnum.GRIN_HEARTS,
            MoodIconEnum.GRIN_SQUINT,
            MoodIconEnum.GRIN_SQUINT_TEARS,
            MoodIconEnum.GRIN_STARS,
            MoodIconEnum.GRIN_TEARS,
            MoodIconEnum.GRIN_TONGUE,
            MoodIconEnum.GRIN_TONGUE_SQUINT,
            MoodIconEnum.GRIN_TONGUE_WINK,
            MoodIconEnum.GRIN_WINK,
            MoodIconEnum.KISS,
            MoodIconEnum.KISS_BEAM,
            MoodIconEnum.KISS_WINK_HEART,
            MoodIconEnum.LAUGH,
            MoodIconEnum.LAUGH_BEAM,
            MoodIconEnum.LAUGH_SQUINT,
            MoodIconEnum.LAUGH_WINK,
            MoodIconEnum.MEH,
            MoodIconEnum.MEH_BLANK,
            MoodIconEnum.MEH_ROLLING_EYES,
            MoodIconEnum.SAD_CRY,
            MoodIconEnum.SAD_TEAR,
            MoodIconEnum.SMILE,
            MoodIconEnum.SMILE_BEAM,
            MoodIconEnum.SMILE_WINK,
            MoodIconEnum.SURPRISE,
            MoodIconEnum.TIRED
        ];
    }

}
