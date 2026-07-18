<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useClients } from '~/composables/api/useClients';
import { ContactGeneral, ContactsList, CurrentCity } from '~/content/contactheader/ContactHeaderData';
import { CompanyData } from '~/content/header/HeaderData';
import type ApiClient from '~/types/api/ApiClient';
import type IFormElement from '~/types/form/FormField';
import { FieldType } from '~/types/form/FormField';

const { t } = useI18n();
const user = useUserStore();

const clientsApi = useClients();
const clients = ref<ApiClient[]>([]);

if (!user.isAuthenticated)
{
  await navigateTo('/auth')
} else {
  clients.value = await clientsApi.getAll();
}

const newClientCreationFlag = ref<boolean>(false);
const selectedClientId = ref<number>(0);

const client = ref<ApiClient>();

const showModalEdit = ref<boolean>(false);

watch(selectedClientId, async function(newValue) {
  if (newValue !== 0)
  {
    client.value = await clientsApi.getById(selectedClientId.value);
    showModalEdit.value = true;
    selectedClientId.value = 0;
  }
});

const ClientFormFields = computed<Array<IFormElement>>(() => {
    const fields: IFormElement[] = [
      {
          name: "fcs",
          placeholder: t("modal.order.fields.fcs"),
          default: client.value?.fcs,
          type: FieldType.Input,
          required: true,
      },
      {
          name: "phone",
          placeholder: t("modal.order.fields.phone"),
          default: client.value?.phone,
          type: FieldType.Input,
          required: true,
      },
      {
          name: "city",
          placeholder: t("modal.order.fields.city"),
          default: client.value?.city,
          type: FieldType.Input,
          required: true,
      },
      {
          name: "address",
          placeholder: t("modal.order.fields.address"),
          default: client.value?.address,
          type: FieldType.Input,
          required: true,
      },
      {
          name: "submit",
          placeholder: client.value?.created_at ? t("modal.client.submit_button") : t("modal.client.create_button"),
          type: FieldType.Button,
      }
    ];

    return fields;
});

function showModal() {
  client.value = {};
  showModalEdit.value = true;
}

async function updateList() {
  if (user.isAuthenticated) {
    clients.value = await clientsApi.getAll();
  }
}

async function submitDeletion() {
  if (client.value?.created_at)
  {
    await clientsApi.remove(client.value.id);
    showModalEdit.value = false;

    await updateList();
  }
}

async function submitClient(clientInfo) {
  if (client.value?.created_at)
  {
    await clientsApi.update(client.value.id, clientInfo);
    showModalEdit.value = false;
    await updateList();
  } else {
    await clientsApi.create(clientInfo);
    await updateList();    
  }
}
</script>

<template>
  <DesktopOnly>
      <ContactHeader 
          :contact-general="String(ContactGeneral)" 
          :contact-list="ContactsList" 
          :current-city="String(CurrentCity)"/>
  </DesktopOnly>

  <div class="my-[10px]">
    <Header 
      :title="String(CompanyData.title)"
      :subtitle="String(CompanyData.subtitle)"/>
  </div>

  <ModalWindow
    :title="t('modal.client.title')"
    class="w-[50%]"
    v-model="showModalEdit"
  >
    <CustomForm
        class=""
        :fields="ClientFormFields"
        @submitinfo="submitClient"
    />

    <button
      v-if="client?.created_at"
      @click="submitDeletion"
      class="text-red-600">
        {{ t('modal.client.delete_button') }}
    </button>
  </ModalWindow>

  <main class="flex flex-col justify-center items-center w-full px-[15px]">
    <div class="w-full md:w-1/2 md:max-w-full bg-secondary-secondary p-5 rounded-[10px]">
      <p>{{ t('user.email') }}</p>
      <b>{{ user.user?.email }}</b>
    </div>

    <div
      class="w-full md:w-1/2 md:max-w-full">
      <button
          @click.prevent="showModal"
          class="py-[10px] text-primary-primary">
          {{ newClientCreationFlag ? t('client.change_button') : t('client.create_button') }}
      </button>

      <ClientList
        v-if="clients.length && !newClientCreationFlag"
        v-model="selectedClientId"
        :clients="clients"
        class="mb-5 overflow-y-auto"
      />
    </div>
  </main>
</template>