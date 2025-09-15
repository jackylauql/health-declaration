import { Button, Card, Checkbox, Radio, SimpleGrid, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useListSymptomOptions } from '../hooks/useListSymptomOptions';
import { useNewDeclarations } from '../hooks/useNewDeclaration';

interface NewDeclarationFormValues {
  fullName: string;
  temperature: string;
  symptoms: string[];
  isInCloseContactCovid: 'yes' | 'no';
}

export function NewDeclarationForm() {
  const { mutateAsync: createNewDeclaration } = useNewDeclarations();

  const { data: symptomOptions, isFetching, isError } = useListSymptomOptions();
  const healthDeclareForm = useForm<NewDeclarationFormValues>({
    mode: 'uncontrolled',
    validate: {
      fullName: isNotEmpty('Full name is required'),
      temperature: (value) => {
        if (!/^\d{2}\.\d{1}$/.test(value))
          return 'Please enter a valid temperature in degree Celsius (e.g. 36.5)';
        if (Number(value) < 35 || Number(value) > 42) return 'Temperature must be between 35 to 42';
        return null;
      },
      isInCloseContactCovid: isNotEmpty('Please select an option'),
    },
  });

  const onSubmitHealthDeclaration = async (values: NewDeclarationFormValues) => {
    try {
      await createNewDeclaration({
        full_name: values.fullName,
        temperature: Number(values.temperature),
        symptoms: values.symptoms,
        close_contact_with_covid: values.isInCloseContactCovid === 'yes' ? true : false,
      });
      notifications.show({
        title: 'Success!',
        message: 'Successfully created new declaration',
        color: 'green',
      });
      healthDeclareForm.reset();
    } catch (err) {
      notifications.show({
        title: 'Error!',
        message: 'Something went wrong!',
        color: 'red',
      });
    }
  };

  if (isError) return 'Something went wrong! :(';

  return (
    <Card mt="lg" withBorder>
      <form onSubmit={healthDeclareForm.onSubmit(onSubmitHealthDeclaration)}>
        <Stack>
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            withAsterisk
            key={healthDeclareForm.key('fullName')}
            {...healthDeclareForm.getInputProps('fullName')}
          />
          <TextInput
            label="Temperature (°C)"
            placeholder="e.g. 36.5"
            withAsterisk
            key={healthDeclareForm.key('temperature')}
            {...healthDeclareForm.getInputProps('temperature')}
          />
          <Checkbox.Group
            label="Do you have any of the following symptoms now or within the last 14 days: Cough, smell/test
impairment, fever, breathing difficulties, body aches, headaches, fatigue, sore throat, diarrhea,
runny nose(even if your symptoms are mild)?"
            key={healthDeclareForm.key('symptoms')}
            {...healthDeclareForm.getInputProps('symptoms')}
          >
            <SimpleGrid mt="xs" mb="xs" w="100%" cols={2}>
              {symptomOptions?.data.map((d) => (
                <Checkbox value={d.id.toString()} label={d.symptom_name} />
              ))}
            </SimpleGrid>
          </Checkbox.Group>
          <Radio.Group
            label="Have you been in contact with anyone who is
suspected to have/has been diagnosed with Covid-19 within the last 14 days?"
            withAsterisk
            key={healthDeclareForm.key('isInCloseContactCovid')}
            {...healthDeclareForm.getInputProps('isInCloseContactCovid')}
          >
            <Stack mt="xs" mb="xs" gap="xs">
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </Stack>
          </Radio.Group>
          <Button type="submit">Submit Declaration</Button>
        </Stack>
      </form>
    </Card>
  );
}
