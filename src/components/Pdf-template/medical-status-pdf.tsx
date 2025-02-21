/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import btnLogo from '@/assets/images/btn-logo.png';
import pdfTopRIghtAsset from '@/assets/images/pdf-right.png';
import { customFileUrlSigner } from '@/actions';
import { ageOptions, articulations, attireOptions, cooperationOptions, delusions, eyeContactOptions, gait, groomingOptions, jusdgement, mannerisms, moodOptions, perception, perceptions, posture, psychomotorActivity, rate, responseLatency, thoughtContent, thoughtProcess, tone, weightOptions } from '@/utils/constant';
import checked from '@/assets/images/checked.png';
import unchecked from '@/assets/images/unchecked.png';

const renderOptions = (options: any[], selected: any) => {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
            {options.map((option, index) => {
                const isSelected = Array.isArray(selected)
                    ? selected.some((item: any) => item.label === option.label)
                    : selected?.label === option.label;

                return (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginRight: 10, // Horizontal spacing between options
                            marginBottom: 5, // Vertical spacing between options
                            padding: 5, // Padding around each option
                            border: '1px solid #E5E7EB', // Optional: Add a border for visual separation
                            borderRadius: 4, // Optional: Rounded corners for the border
                            backgroundColor: isSelected ? '#c6dcf8' : 'transparent', // Highlight the selected option
                        }}
                    >
                        <Image
                            style={{ width: 12, height: 12, marginRight: 5 }} // Checkbox size and spacing
                            src={isSelected ? checked.src : unchecked.src}
                        />
                        <Text style={{ fontSize: 12 }}>{option.label}</Text>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
        position: "relative"
    },
    headerContainer: {
        marginBottom: 30,
    },
    topRightDesign: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 150,
        height: 100,
    },
    logo: {
        width: 300,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        color: '#1F2937'
    },
    documentDate: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 10,
        borderBottom: '2px solid #E5E7EB',
        paddingBottom: 10
    },
    section: {
        marginBottom: 20,
        border: '1px solid #E5E7EB',
        borderRadius: "5px",
        padding: 4
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 15,
        backgroundColor: "#f8f9f9",
        textDecoration: 'underline',
        padding: 6
    },
    infoGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 5
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
        paddingBottom: 4,
        borderBottom: '1px solid #E5E7EB',
        alignItems: 'center',
    },
    label: {
        width: 140,
        fontSize: 12,
        color: '#4B5563',
        fontWeight: 'bold',
        marginRight: 10,
    },
    value: {
        display: "flex",
        gap: 5,
        flex: 1,
        fontSize: 12,
        color: '#1F2937',
        whiteSpace: 'pre-wrap' // to preserve newlines
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        color: '#6B7280',
        fontSize: 10,
        borderTop: '1px solid #E5E7EB',
        paddingTop: 10
    },
});

const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// PDF Document Component for Mental Status Exam
const MentalStatusExamPdf = ({ formData }: any) => {
    const therapistSignatures = formData.signature || '';

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image style={styles.topRightDesign} src={pdfTopRIghtAsset.src} />
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Image style={styles.logo} src={btnLogo.src} />
                    <Text style={styles.title}>Mental Status Exam</Text>
                    <Text style={styles.documentDate}>
                        Exam Date: {formatDate(formData.examDate || new Date())}
                    </Text>
                </View>

                {/* Basic Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Basic Information</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Client Name:</Text>
                            <Text style={styles.value}>{formData.clientName || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Date:</Text>
                            <Text style={styles.value}>{formatDate(formData.examDate || new Date())}</Text>
                        </View>
                    </View>
                </View>

                {/* Appearance/Behavior */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Appearance/Behavior</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Age Appearance:</Text>
                            <View style={styles.value}>
                                {renderOptions(ageOptions, formData.ageAppearance)}
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Weight Appearance:</Text>
                            <View style={styles.value}>
                                {renderOptions(weightOptions, formData.weightAppearance)}
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Attire:</Text>
                            <View style={styles.value}>
                                {renderOptions(attireOptions, formData.attire)}
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Grooming:</Text>
                            <View style={styles.value}>
                                {renderOptions(groomingOptions, formData.grooming)}
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Comments:</Text>
                            <Text style={styles.value}>{formData.appearanceComments || 'No'}</Text>
                        </View>
                    </View>
                </View>

                {/* Demeanor/Interaction */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Demeanor/Interaction</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Mood/Affect:</Text>
                            {renderOptions(moodOptions, formData.moodAffect)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Eye Contact:</Text>
                            {renderOptions(eyeContactOptions, formData.eyeContact)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Cooperation:</Text>
                            {renderOptions(cooperationOptions, formData.cooperation)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Comments:</Text>
                            <Text style={styles.value}>{formData.demeanorComments || 'No'}</Text>
                        </View>
                    </View>
                </View>

                {/* Speech */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Speech</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Articulation:</Text>
                            {renderOptions(articulations, formData.articulation)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Tone:</Text>
                            {renderOptions(tone, formData.tone)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Rate:</Text>
                            {renderOptions(rate, formData.rate)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Response Latency:</Text>
                            {renderOptions(responseLatency, formData.responseLatency)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Comments:</Text>
                            <Text style={styles.value}>{formData.speechComments || 'No'}</Text>
                        </View>
                    </View>
                </View>

                {/* Cognition */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cognition</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Perception:</Text>
                            {renderOptions(perception, formData.perception)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Judgment:</Text>
                            {renderOptions(jusdgement, formData.judgment)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Impulse Control:</Text>
                            {formData.impulseControl?.label || 'No'}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Insight:</Text>
                            {formData.insight?.label || 'No'}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Gait:</Text>
                            {renderOptions(gait, formData.gait)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Posture:</Text>
                            {renderOptions(posture, formData.posture)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Psychomotor Activity:</Text>
                            {renderOptions(psychomotorActivity, formData.psychomotorActivity)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Mannerisms:</Text>
                            {renderOptions(mannerisms, formData.mannerisms)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Thought Content:</Text>
                            {renderOptions(thoughtContent, formData.thoughtContent)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Thought Process:</Text>
                            {renderOptions(thoughtProcess, formData.thoughtProcess)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Delusions:</Text>
                            {renderOptions(delusions, formData.delusions)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Perceptions:</Text>
                            {renderOptions(perceptions, formData.perceptions)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Comments:</Text>
                            <Text style={styles.value}>{formData.cognitionComments || 'No'}</Text>
                        </View>
                    </View>
                </View>


                {/* Therapist Signature */}
                <View style={{ ...styles.section, marginTop: 100 }}>
                    <Text style={styles.sectionTitle}>Therapist Signature</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Therapist Name:</Text>
                            <Text style={styles.value}>{formData.clinicianName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Signature:</Text>
                            <Image style={{ width: 250, height: 60 }} src={therapistSignatures} />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Date:</Text>
                            <Text style={styles.value}>{formatDate(new Date())}</Text>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>
                        Generated by Black Therapy Network - Normalizing Therapy in the Black Community
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export const uploadMentalStatusExam = async (formData: any) => {
    try {
        const assessmentDoc = <MentalStatusExamPdf formData={formData} />;
        const pdfBlob = await pdf(assessmentDoc).toBlob();
        const fileName = `appointments/${formData.clientId.email}/my-appointment-files/mental-status-exam-${new Date().getTime()}.pdf`;
        const { signedUrl, key } = await customFileUrlSigner(fileName);
        const uploadResponse = await fetch(signedUrl, {
            method: 'PUT',
            body: pdfBlob,
            headers: {
                'Content-Type': 'application/pdf'
            }
        });
        if (!uploadResponse.ok) {
            throw new Error('Failed to upload Mental Status Exam');
        }
        return { uploadedKey: key, signedUrl };
    } catch (error) {
        console.error('Error generating and uploading Mental Status Exam PDF:', error);
        throw error;
    }
};

export default MentalStatusExamPdf;