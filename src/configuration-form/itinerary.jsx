import PropTypes from 'prop-types';
import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import { withTranslation } from 'react-i18next';

export const ITINERARY_ITEM = 'item';
export const ITINERARY_HEADING = 'heading';
export const ITINERARY_CHECKBOXES = 'checkboxes';
export const ITINERARY_LINES = 'lines';
export const ITINERARY_NEW_PAGE = 'new_page';

class Itinerary extends React.Component {
    renderRow = ({type, value}, index) => {
        switch (type) {
            case ITINERARY_ITEM:
                return this.renderItem(value, index);

            case ITINERARY_HEADING:
                return this.renderHeading(value, index);

            case ITINERARY_NEW_PAGE:
                return this.renderNewPage(value, index);

            case ITINERARY_CHECKBOXES:
                return this.renderCheckboxes(value, index);

            case ITINERARY_LINES:
            default:
                return this.renderLines(value, index);
        }
    };

    renderItem(item, index) {
        const {field, onChange} = this.props;
        return (
            <InputGroup key={index}>
                <FormControl
                    placeholder="Itinerary item"
                    value={item}
                    onChange={onChange}
                    data-index={index}
                    data-type={ITINERARY_ITEM}
                    data-field={field}
                    required
                />
                {this.renderRemoveButton(index)}
            </InputGroup>
        );
    }

    renderHeading(item, index) {
        const {field, onChange} = this.props;
        return (
            <InputGroup key={index}>
                <FormControl
                    placeholder="Itinerary heading"
                    value={item}
                    onChange={onChange}
                    data-index={index}
                    data-type={ITINERARY_HEADING}
                    data-field={field}
                    required
                />
                {this.renderRemoveButton(index)}
            </InputGroup>
        );
    }

    renderNewPage(item, index) {
        const {t} = this.props;
        return (
            <InputGroup key={index}>
                <InputGroup.Text className="flex-grow-1">
                    {t('configuration.itinerary.placeholder.page')}
                </InputGroup.Text>
                {this.renderRemoveButton(index)}
            </InputGroup>
        );
    }

    renderLines(numberOfLines, index) {
        const {field, onChange, t} = this.props;
        return (
            <InputGroup key={index}>
                <FloatingLabel
                    className="flex-grow-1"
                    controlId={'lines-' + index}
                    label={t('configuration.itinerary.placeholder.lines')}
                >
                    <FormControl
                        placeholder={t('configuration.itinerary.placeholder.lines')}
                        type="number"
                        min={1}
                        max={23}
                        value={numberOfLines}
                        onChange={onChange}
                        data-index={index}
                        data-type={ITINERARY_LINES}
                        data-field={field}
                        required
                    />
                </FloatingLabel>
                {this.renderRemoveButton(index)}
            </InputGroup>
        );
    }

    renderCheckboxes(numberOfLines, index) {
        const {field, onChange, t} = this.props;
        return (
            <InputGroup key={index}>
                <FloatingLabel
                    className="flex-grow-1"
                    controlId={'checkboxes-' + index}
                    label={t('configuration.itinerary.placeholder.checkboxes')}
                >
                    <FormControl
                        placeholder={t('configuration.itinerary.placeholder.checkboxes')}
                        type="number"
                        min={1}
                        max={23}
                        value={numberOfLines}
                        onChange={onChange}
                        data-index={index}
                        data-type={ITINERARY_CHECKBOXES}
                        data-field={field}
                        required
                    />
                </FloatingLabel>
                {this.renderRemoveButton(index)}
            </InputGroup>
        );
    }

    renderRemoveButton(index) {
        const {field, onRemove, t} = this.props;
        return (
            <Button
                variant="outline-danger"
                onClick={onRemove}
                data-index={index}
                data-field={field}
            >
                {t('configuration.itinerary.button.remove')}
            </Button>
        );
    }

    render() {
        const {field, itinerary, onAdd, onCopy, t} = this.props;
        return (
            <>
                <Stack gap={2}>
                    {itinerary.map(this.renderRow)}
                    {itinerary.length === 0 && (
                        <Alert variant="secondary" className="mb-0">
                            {t('configuration.itinerary.empty')}
                        </Alert>
                    )}
                    <Stack direction="horizontal" gap={3}>
                        <ButtonGroup>
                            <Button
                                variant="outline-secondary"
                                onClick={onAdd}
                                data-type={ITINERARY_ITEM}
                                data-field={field}
                            >
                                {t('configuration.itinerary.button.item')}
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={onAdd}
                                data-type={ITINERARY_HEADING}
                                data-field={field}
                            >
                                {t('configuration.itinerary.button.heading')}
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={onAdd}
                                data-type={ITINERARY_CHECKBOXES}
                                data-field={field}
                            >
                                {t('configuration.itinerary.button.checkboxes')}
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={onAdd}
                                data-type={ITINERARY_LINES}
                                data-field={field}
                            >
                                {t('configuration.itinerary.button.lines')}
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={onAdd}
                                data-type={ITINERARY_NEW_PAGE}
                                data-field={field}
                            >
                                {t('configuration.itinerary.button.page')}
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </Stack>
                {onCopy && (
                    <Button
                        variant="outline-danger"
                        className="mt-3"
                        onClick={onCopy}
                        data-field={field}
                    >
                        {t('configuration.itinerary.button.copy')}
                    </Button>
                )}
            </>
        );
    }
}

Itinerary.propTypes = {
	field: PropTypes.string.isRequired,
	itinerary: PropTypes.array.isRequired,
	onAdd: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onCopy: PropTypes.func,
	onRemove: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export default withTranslation( 'app' )( Itinerary );
