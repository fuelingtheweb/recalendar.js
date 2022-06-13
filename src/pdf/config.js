import dayjs from 'dayjs';
import { t } from 'i18next';

import {
    ITINERARY_ITEM,
    ITINERARY_LINES,
    ITINERARY_HEADING,
    ITINERARY_CHECKBOXES,
} from 'configuration-form/itinerary';
import { LATO } from 'pdf/lib/fonts';

const CONFIG_FIELDS = [
    'fontFamily',
    'year',
    'month',
    'firstDayOfWeek',
    'monthCount',
    'weekendDays',
    'isLeftHanded',
    'alwaysOnSidebar',
    'isMonthOverviewEnabled',
    'habits',
    'monthItinerary',
    'isWeekOverviewEnabled',
    'todos',
    'dayItineraries',
    'isWeekRetrospectiveEnabled',
    'weekRetrospectiveItinerary',
    'specialDates',
];

export const CONFIG_FILE = 'config.json';
export const CONFIG_VERSION_1 = 'v1';
export const CONFIG_VERSION_2 = 'v2';
export const CONFIG_CURRENT_VERSION = CONFIG_VERSION_2;

export function hydrateFromObject(object) {
    return CONFIG_FIELDS.reduce(
        (fields, field) => ({
            ...fields,
            [field]: object[field],
        }),
        {}
    );
}

class PdfConfig {
    constructor() {
        this.year = dayjs().year();
        this.month = 0;
        this.firstDayOfWeek = dayjs.localeData().firstDayOfWeek();
        this.weekendDays = [0, 6];
        this.isLeftHanded = false;
        this.alwaysOnSidebar = false;
        this.monthCount = 12;
        this.fontFamily = LATO;
        this.isMonthOverviewEnabled = true;
        this.habits = [
            t('habits.example1', { ns: 'config' }),
            t('habits.example2', { ns: 'config' }),
            t('habits.example3', { ns: 'config' }),
            t('habits.example4', { ns: 'config' }),
        ];
        this.monthItinerary = [
            {
                type: ITINERARY_ITEM,
                value: t('month.goal', { ns: 'config' }),
            },
            {
                type: ITINERARY_LINES,
                value: 2,
            },
            {
                type: ITINERARY_ITEM,
                value: t('month.notes', { ns: 'config' }),
            },
            {
                type: ITINERARY_LINES,
                value: 23,
            },
        ];
        this.isWeekOverviewEnabled = true;
        this.todos = [
            t('todos.example1', { ns: 'config' }),
            t('todos.example2', { ns: 'config' }),
        ];

        let dayOfWeek = this.firstDayOfWeek;
        this.dayItineraries = [...Array(7).keys()].map(() => {
            const itinerary = {
                dayOfWeek,
                items: [{ type: ITINERARY_LINES, value: 23 }],
                isEnabled: true,
            };
            dayOfWeek = ++dayOfWeek % 7;
            return itinerary;
        });
        this.isWeekRetrospectiveEnabled = true;
        this.weekRetrospectiveItinerary = [
            {
                type: ITINERARY_LINES,
                value: 23,
            },
        ];
        this.pageSize = ['157mm', '209mm'];
        this.specialDates = {
            '01-01': [
                t('special-dates.example1', { ns: 'config' }),
                t('special-dates.example2', { ns: 'config' }),
            ],
            '03-01': [t('special-dates.example3', { ns: 'config' })],
            '13-01': [
                t('special-dates.example4', { ns: 'config' }),
                t('special-dates.example5', { ns: 'config' }),
            ],
            '14-01': [t('special-dates.example6', { ns: 'config' })],
        };
    }
}

export default PdfConfig;
