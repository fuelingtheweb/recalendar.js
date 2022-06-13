import {StyleSheet, Text, View} from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import React from 'react';

import {
    ITINERARY_ITEM,
    ITINERARY_HEADING,
    ITINERARY_CHECKBOXES,
    ITINERARY_LINES,
} from 'configuration-form/itinerary';

class Itinerary extends React.PureComponent {
    styles = StyleSheet.create({
        line: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: 20,
            minHeight: 20,
            padding: '0 0 0 5',
        },

        fullLine: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: 20,
            minHeight: 20,
        },

        text: {
            flex: 1,
            borderBottom: '1 solid #AAA',
            fontSize: 12,
            fontWeight: 'bold',
            height: 20,
            minHeight: 20,
            padding: '2 0 0 5',
            marginLeft: 5,
        },

        fullText: {
            flex: 1,
            borderBottom: '1 solid #AAA',
            fontSize: 12,
            fontWeight: 'bold',
            height: 20,
            minHeight: 20,
            padding: '2 0 0 5',
        },

        box: {
            border: '1 solid #AAA',
            height: 16,
            width: 16,
        },
    });

    renderItineraryItem = ({type, value}, index) => {
        switch (type) {
            case ITINERARY_HEADING:
                return this.renderHeading(value, index);

            case ITINERARY_ITEM:
                return this.renderItem(value, index);

            case ITINERARY_CHECKBOXES:
                return this.renderCheckboxes(value);

            case ITINERARY_LINES:
            default:
                return this.renderLines(value);
        }
    };

    renderHeading(text, index) {
        return (
            <View key={index} style={this.styles.fullLine}>
                <Text style={this.styles.fullText}>{text}</Text>
            </View>
        );
    }

    renderItem(text, index) {
        return (
            <View key={index} style={this.styles.line}>
                <View style={this.styles.box} />

                <Text style={this.styles.text}>{text}</Text>
            </View>
        );
    }

    renderLines(count) {
        const lines = [];
        for (let i = 0; i < count; i++) {
            lines.push(
                <View key={i} style={this.styles.fullLine}>
                    <Text style={this.styles.fullText} />
                </View>,
            );
        }

        return lines;
    }

    renderCheckboxes(count) {
        const lines = [];
        for (let i = 0; i < count; i++) {
            lines.push(
                <View key={i} style={this.styles.line}>
                    <View style={this.styles.box} />

                    <Text style={this.styles.text} />
                </View>,
            );
        }

        return lines;
    }

    render() {
        return <>{this.props.items.map(this.renderItineraryItem)}</>;
    }
}

Itinerary.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Itinerary;
