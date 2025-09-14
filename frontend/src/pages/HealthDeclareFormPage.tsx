import { Button, Card, Radio, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

interface HealthDeclareFormValues {
  fullName: string;
  temperature: string;
  isInCloseContactCovid: boolean;
}

export function HealthDeclareFormPage() {
  const healthDeclareForm = useForm<HealthDeclareFormValues>({
    mode: 'uncontrolled',
    validate: {
      fullName: isNotEmpty('Full name is required'),
      temperature: (value) =>
        /^\d{2}\.\d{1}$/.test(value)
          ? null
          : 'Please enter a valid temperature in degree Celsius (e.g. 36.5)',
      isInCloseContactCovid: isNotEmpty('Please select an option'),
    },
  });

  const onSubmitHealthDeclaration = (values: HealthDeclareFormValues) => {
    console.log('vvv', values);
  };

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
