export enum MoodIconEnum {
    YAWN = 'YAWN',
    WINK = 'WINK',
    SMILE_1 = 'SMILE_1',
    SMILE = 'SMILE',
    SURPRISE = 'SURPRISE',
    SHOCKED = 'SHOCKED',
    SCEPTIC = 'SCEPTIC',
    SAD_2 = 'SAD_2',
    SAD_1 = 'SAD_1',
    HAPPY_3 = 'HAPPY_3',
    PAIN = 'PAIN',
    MUTED = 'MUTED',
    MEH = 'MEH',
    LAUGH = 'LAUGH',
    ILL = 'ILL',
    HAPPY_2 = 'HAPPY_2',
    HAPPY_1 = 'HAPPY_1',
    CUTE = 'CUTE',
    CRYING = 'CRYING',
    CRAZY = 'CRAZY',
    COOL = 'COOL',
    BORED = 'BORED',
    BLUSH = 'BLUSH',
    SAD = 'SAD',
    HAPPY = 'HAPPY',
}

export namespace MoodIconEnum {

    export function icon(type: MoodIconEnum) {
        switch (type) {
            case MoodIconEnum.YAWN:
                return '001-yawn.svg';
            case MoodIconEnum.WINK:
                return '002-wink.svg';
            case MoodIconEnum.SMILE_1:
                return '003-smile-1.svg';
            case MoodIconEnum.SMILE:
                return '004-smile.svg';
            case MoodIconEnum.SURPRISE:
                return '005-surprise.svg';
            case MoodIconEnum.SHOCKED:
                return '006-shocked.svg';
            case MoodIconEnum.SCEPTIC:
                return '007-sceptic.svg';
            case MoodIconEnum.SAD_2:
                return '008-sad-2.svg';
            case MoodIconEnum.SAD_1:
                return '009-sad-1.svg';
            case MoodIconEnum.HAPPY_3:
                return '010-happy-3.svg';
            case MoodIconEnum.PAIN:
                return '011-pain.svg';
            case MoodIconEnum.MUTED:
                return '012-muted.svg';
            case MoodIconEnum.MEH:
                return '013-meh.svg';
            case MoodIconEnum.LAUGH:
                return '014-laugh.svg';
            case MoodIconEnum.ILL:
                return '015-ill.svg';
            case MoodIconEnum.HAPPY_2:
                return '016-happy-2.svg';
            case MoodIconEnum.HAPPY_1:
                return '017-happy-1.svg';
            case MoodIconEnum.CUTE:
                return '018-cute.svg';
            case MoodIconEnum.CRYING:
                return '019-crying.svg';
            case MoodIconEnum.CRAZY:
                return '020-crazy.svg';
            case MoodIconEnum.COOL:
                return '021-cool.svg';
            case MoodIconEnum.BORED:
                return '022-bored.svg';
            case MoodIconEnum.BLUSH:
                return '023-blush.svg';
            case MoodIconEnum.SAD:
                return '024-sad.svg';
            case MoodIconEnum.HAPPY:
                return '025-happy.svg';
        }
    }

    export function values(): MoodIconEnum[] {
        return [
            MoodIconEnum.YAWN,
            MoodIconEnum.WINK,
            MoodIconEnum.SMILE_1,
            MoodIconEnum.SMILE,
            MoodIconEnum.SURPRISE,
            MoodIconEnum.SHOCKED,
            MoodIconEnum.SCEPTIC,
            MoodIconEnum.SAD_2,
            MoodIconEnum.SAD_1,
            MoodIconEnum.HAPPY_3,
            MoodIconEnum.PAIN,
            MoodIconEnum.MUTED,
            MoodIconEnum.MEH,
            MoodIconEnum.LAUGH,
            MoodIconEnum.ILL,
            MoodIconEnum.HAPPY_2,
            MoodIconEnum.HAPPY_1,
            MoodIconEnum.CUTE,
            MoodIconEnum.CRYING,
            MoodIconEnum.CRAZY,
            MoodIconEnum.COOL,
            MoodIconEnum.BORED,
            MoodIconEnum.BLUSH,
            MoodIconEnum.SAD,
            MoodIconEnum.HAPPY,
        ];
    }

}
