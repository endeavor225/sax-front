<template>
  <q-page padding>

    <div class="row q-m-md">
      <div class="col-4 q-px-md">
        <h5 class="text-bold">Modèle</h5>
        <draggable
          class="dragArea list-group"
          :list="modelForms"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :clone="cloneDog"
          ghost-class="ghost"
          @change="log"
          item-key="id"
        >
          <template #item="{ element }" class="q-gutter-md">
            <q-list>
              <div class="bg-teal-1 text-grey-9">
                <q-item v-ripple class="q-ma-xs" v-if="element.type === 'file'">
                  <q-item-section avatar>
                    <q-icon name="menu"
                  /></q-item-section>
                  <q-item-section>
                    <q-file borderless label="Importer un document">
                      <template v-slot:prepend>
                        <q-icon name="upload_file" @click.stop />
                      </template>
                    </q-file>
                  </q-item-section>
                </q-item>

                <q-item
                  v-ripple
                  class="q-ma-xs"
                  v-else-if="element.type === 'select'"
                >
                  <q-item-section avatar>
                    <q-icon name="menu"
                  /></q-item-section>
                  <q-item-section>
                    <q-select outlined  v-model="element.model" :label="element.label" readonly />
                  </q-item-section>
                </q-item>

                <q-item
                  v-ripple
                  class="q-ma-xs"
                  v-else-if="element.type === 'textarea'"
                >
                  <q-item-section avatar>
                    <q-icon name="menu"
                  /></q-item-section>
                  <q-item-section>
                    <q-input
                      outlined
                      type="textarea"
                      :placeholder="element.placeholder"
                      readonly
                    />
                  </q-item-section>
                </q-item>
                <q-item
                  v-ripple
                  class="q-ma-xs"
                  v-else-if="element.type === 'checkbox'"
                >
                  <q-item-section avatar>
                    <q-icon name="menu"
                  /></q-item-section>
                  <q-item-section>
                    <q-checkbox
                      v-model="element.model"
                      :label="element.label"
                      :placeholder="element.placeholder"
                      readonly
                    />
                  </q-item-section>
                </q-item>
                <q-item
                  v-ripple
                  class="q-ma-xs"
                  v-else-if="element.type === 'radio'"
                >
                  <q-item-section avatar>
                    <q-icon name="menu"
                  /></q-item-section>
                  <q-item-section>
                    <q-radio
                      v-model="shape"
                      val="line"
                      :label="element.label"
                      readonly
                    />
                  </q-item-section>
                </q-item>

                <q-item
                  v-ripple
                  class="q-ma-xs"
                  v-else-if="element.type === 'date'"
                >
                  <q-item-section avatar>
                    <q-icon name="menu"
                  /></q-item-section>
                  <q-item-section>
                    <q-input
                      outlined
                      :type="(element.type = 'date')"
                      :placeholder="element.placeholder"
                      readonly
                    />
                  </q-item-section>
                </q-item>

                <q-item
                  v-ripple
                  class="q-ma-xs"
                  v-else-if="element.type === 'datetime'"
                >
                  <q-item-section avatar>
                    <q-icon name="menu"
                  /></q-item-section>
                  <q-item-section>
                    <q-input filled v-model="date">
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>

                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time
                              v-model="date"
                              mask="YYYY-MM-DD HH:mm"
                              format24h
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>

                <q-item v-ripple class="q-ma-xs" v-else>
                  <q-item-section avatar>
                    <q-icon name="menu"
                  /></q-item-section>
                  <q-item-section>
                    <q-input
                      outlined
                      :type="element.type"
                      :placeholder="element.placeholder"
                      :label="element.label"
                      readonly
                    />
                  </q-item-section>
                </q-item>
              </div>
            </q-list>
          </template>
        </draggable>
      </div>

      
        <div class="col-8 q-px-md">
          <!-- <q-form @submit="saveTemplateForm" ref="eForm"> -->
          <q-form @submit="onSubmit" ref="eForm">
            <h5 class="text-bold">Template</h5>
            <q-card
              flat
              bordered
              class="q-pa-md bg-green-1"
              style="min-height: 100px"
            >
            
              <div class="bg-white rounded-borders">
                <q-card-section class="my-card-header">
                  <div class="text-h4">Nom de la section du formulaire</div>
                
                </q-card-section>
                <q-card-section>
                  <q-input v-model="nom" 
                    type="text" 
                    label="Nom de la table" 
                    lazy-rules
                    :rules="[
                    (val) => !!val || 'Le nom de la table titre est obligatoire',
                    (val) => val.length > 3 || 'ce champ doit contenir au moins 4 caractères',
                    ]"
                  />
                </q-card-section>
              </div>
              <draggable
                class="q-pa-md"
                :list="templateForm"
                :animation="100"
                group="people"
                ghost-class="ghost"
                @click="log"
                @change="log"
                item-key="id"
              >
                <template #item="{ element, index }">
                  <div class="hover_drop q-pt-xs">
                    <!-- <================== type text ====================> -->
                    <div v-if="element.type === 'text'">
                      <!-- Debut de la div de modification -->

                      <div
                        class="my-card-rigth bg-white rounded-border q-mt-md"
                        v-if="element.edit"
                      >
                        <q-card-section class="">
                          <q-input
                            color="green-10"
                            filled
                            v-model="element.name"
                            autofocus
                          />
                        </q-card-section>
                        <q-card-section class="q-mb-md">
                          <q-input
                            :placeholder="element.placeholder"
                            :maxlength="element.lengthTable.maxlength"
                            :minlength="element.lengthTable.minlength"
                            dense="dense"
                            v-model="element.defaultValue"
                          />
                        </q-card-section>

                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.required"
                            label="Obligatoire"
                            left-label
                          />

                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.unique"
                            label=" Unique"
                            left-label
                          />

                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.lengthTable.status"
                            label="Definir nombre de caractère"
                            left-label
                          />
                          <div v-if="element.lengthTable.status">
                            <span class="flex">
                              <q-input
                                v-model.number="element.lengthTable.maxlength"
                                type="number"
                                label="Caractère max"
                                class="q-mr-sm"
                                :rules="[
                                  (val) =>
                                    (element.lengthTable.maxlength !== null &&
                                      element.lengthTable.maxlength > 0) ||
                                    'S\'il vous plait Entrer un nombre correct',
                                ]"
                              />
                              <q-separator vertical inset />
                              <q-input
                                v-model.number="element.lengthTable.minlength"
                                type="number"
                                label="Caractère min"
                                class="q-ml-sm"
                              />
                            </span>
                          </div>

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>

                      <!-- fin de la div de modification -->

                      <!-- Début de la div en lecture simple -->

                      <div
                        class="bg-white rounded-border q-mt-md"
                        @click="activeEdit(index)"
                        v-else
                      >
                        <q-card-section class="">
                          <div class="text-h6">{{ element.name }}</div>
                        </q-card-section>
                        <q-card-section>
                          <q-input
                            v-model="element.model"
                            :maxlength="element.lengthTable.maxlength"
                            :minlength="element.lengthTable.minlength"
                            :placeholder="element.placeholder"
                            dense="dense"
                          />
                        </q-card-section>
                      </div>

                      <!-- fin de la div en lecture simple -->
                    </div>

                    <!-- <================== type textarea ====================> -->
                    <div v-if="element.type === 'textarea'">
                      <!-- Debut de la div de modification -->

                      <div
                        class="my-card-rigth bg-white rounded-border q-mt-md"
                        v-if="element.edit"
                      >
                        <q-card-section class="">
                          <q-input
                            color="green-10"
                            filled
                            v-model="element.name"
                            autofocus
                          />
                        </q-card-section>
                        <q-card-section
                          >
                          <q-input
                            :placeholder="element.placeholder"
                            :type="element.type"
                            :maxlength="element.lengthTable.maxlength"
                            dense="dense"
                            v-model="element.defaultValue"
                            readonly
                          />
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.required"
                            label="Obligatoire"
                            left-label
                          />

                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.unique"
                            label="Unique"
                            left-label
                          />

                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.lengthTable.status"
                            label="Definir nombre de caractère Max"
                            left-label
                          />
                          <span v-if="element.lengthTable.status"
                            ><q-input
                              v-model.number="element.lengthTable.maxlength"
                              type="number"
                              label="Caractère max"
                          /></span>

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>

                      <!-- fin de la div de modification -->

                      <!-- Début de la div en lecture simple -->

                      <div
                        class="bg-white rounded-border q-mt-md"
                        @click="activeEdit(index)"
                        v-else
                      >
                        <q-card-section class="">
                          <div class="text-h6">{{ element.name }}</div>
                        </q-card-section>
                        <q-card-section>
                          <q-input
                            v-model="element.model"
                            :placeholder="element.placeholder"
                            :maxlength="element.lengthTable.maxlength"
                            dense="dense"
                            readonly
                          />
                        </q-card-section>
                      </div>

                      <!-- fin de la div en lecture simple -->
                    </div>

                    <!-- <================== type email ====================> -->
                    <div v-if="element.type === 'email'">
                      <!-- Debut de la div de modification -->

                      <div
                        class="my-card-rigth bg-white rounded-border q-mt-md"
                        v-if="element.edit"
                      >
                        <q-card-section class="">
                          <q-input
                            color="green-10"
                            filled
                            v-model="element.name"
                            autofocus
                          />
                        </q-card-section>
                        <q-card-section>
                          <q-input
                            :placeholder="element.placeholder"
                            dense="dense"
                            readonly
                          />
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                          checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.required"
                            label="Obligatoire"
                            left-label
                          />

                          <q-toggle
                          checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.unique"
                            label="Unique"
                            left-label
                          />

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>

                      <!-- fin de la div de modification -->

                      <!-- Début de la div en lecture simple -->

                      <div
                        class="bg-white rounded-border q-mt-md"
                        @click="activeEdit(index)"
                        v-else
                      >
                        <q-card-section class="">
                          <div class="text-h6">{{ element.name }}</div>
                        </q-card-section>
                        <q-card-section>
                          <q-input
                            v-model="element.model"
                            :placeholder="element.placeholder"
                            dense="dense"
                            readonly
                          />
                        </q-card-section>
                      </div>

                      <!-- fin de la div en lecture simple -->
                    </div>

                    <!-- <================== type number ====================> -->
                    <div v-if="element.type === 'number'">
                      <!-- Debut de la div de modification -->

                      <div
                        class="my-card-rigth bg-white rounded-border q-mt-md"
                        v-if="element.edit"
                      >
                        <q-card-section class="">
                          <q-input
                            color="green-10"
                            filled
                            v-model="element.name"
                            autofocus
                          />
                        </q-card-section>
                        <q-card-section>
                          <q-input
                            :placeholder="element.placeholder"
                            dense="dense"
                            readonly
                          />
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.required"
                            label="Obligatoire"
                            left-label
                          />

                          <q-toggle
                          checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.unique"
                            label="Unique"
                            left-label
                          />

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>

                      <!-- fin de la div de modification -->

                      <!-- Début de la div en lecture simple -->

                      <div
                        class="bg-white rounded-border q-mt-md"
                        @click="activeEdit(index)"
                        v-else
                      >
                        <q-card-section class="">
                          <div class="text-h6">{{ element.name }}</div>
                        </q-card-section>
                        <q-card-section>
                          <q-input
                            v-model="element.model"
                            :placeholder="element.placeholder"
                            dense="dense"
                            readonly
                          />
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.required"
                            label="Obligatoire"
                            left-label
                          />

                          <q-toggle
                          checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.unique"
                            label="Unique"
                            left-label
                          />

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>

                      <!-- fin de la div en lecture simple -->
                    </div>

                    <!-- <================== type tel ====================> -->
                    <div v-if="element.type === 'tel'">
                      <!-- Debut de la div de modification -->

                      <div
                        class="my-card-rigth bg-white rounded-border q-mt-md"
                        v-if="element.edit"
                      >
                        <q-card-section class="">
                          <q-input
                            color="green-10"
                            filled
                            v-model="element.name"
                            autofocus
                          />
                        </q-card-section>
                        <q-card-section>
                          <q-input
                            :placeholder="element.placeholder"
                            dense="dense"
                            readonly
                          />
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                          checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.required"
                            label="Obligatoire"
                            left-label
                          />

                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.unique"
                            label="Unique"
                            left-label
                          />

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>

                      <!-- fin de la div de modification -->

                      <!-- Début de la div en lecture simple -->

                      <div
                        class="bg-white rounded-border q-mt-md"
                        @click="activeEdit(index)"
                        v-else
                      >
                        <q-card-section class="">
                          <div class="text-h6">{{ element.name }}</div>
                        </q-card-section>
                        <q-card-section>
                          <q-input
                            v-model="element.model"
                            :placeholder="element.placeholder"
                            dense="dense"
                            readonly
                          />
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.required"
                            label="Obligatoire"
                            left-label
                          />

                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.unique"
                            label="Unique"
                            left-label
                          />

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>

                      <!-- fin de la div en lecture simple -->
                    </div>
                    <!-- <================== type checkbox ====================> -->
                    <div v-if="element.type === 'checkbox'">
                      <!-- Debut de la div de modification -->

                      <div
                        class="my-card-rigth bg-white rounded-border q-mt-md"
                        v-if="element.edit"
                      >
                        <q-card-section class="">
                          <q-input
                            color="green-10"
                            filled
                            v-model="element.name"
                            autofocus
                          />
                        </q-card-section>
                        <q-card-section class="q-gutter-sm">
                          <div
                            v-for="option in element.weflyOption"
                            :key="option.id"
                          >
                            <div
                              class="row items-center justify-between"
                              v-if="option.edit"
                            >
                              <q-icon
                                class="col-1"
                                color="grey"
                                name="check_box_outline_blank"
                                size="sm"
                              />
                              <q-input
                                class="col-10"
                                v-model="option.label"
                                autofocus
                              />
                              <q-btn
                                flat
                                round
                                class=""
                                color="red"
                                icon="clear"
                                @click="removeOptionAt(option.id, index)"
                                size="sm"
                              />
                            </div>
                            <div v-else>
                              <span
                                @click="activeOptionEdit(option.id, element.id)"
                              >
                                <q-icon
                                  flat
                                  name="check_box_outline_blank"
                                  color="grey"
                                  size="sm"
                                />
                                {{ option.label }}
                              </span>
                            </div>
                          </div>
                          <div class="row" v-if="element.autres">
                            <q-icon
                              class="col-1"
                              color="grey"
                              name="check_box_outline_blank"
                              size="sm"
                            />
                            <q-input
                              class="col-10"
                              placeholder="Autres"
                              autofocus
                              readonly
                            />
                            <q-btn
                              flat
                              round
                              class=""
                              color="red"
                              icon="clear"
                              @click="removeOtherOption(index)"
                              size="sm"
                            />
                          </div>
                          <div class="text-grey">
                            <span @click="addOption(index)"
                              ><q-icon name="check_box_outline_blank" size="sm" />
                              Ajouter une option ou
                            </span>
                            <q-btn
                              label='ajouter "Autres"'
                              flat
                              color="primary"
                              @click="addOtherOption(index)"
                              no-caps
                              dense
                              v-if="!element.autres"
                            />
                          </div>
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                          
                            v-model="element.required"
                            label="Obligatoire"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            left-label
                          />

                          <q-toggle
                            v-model="element.unique"
                            label="Unique"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            left-label
                          />

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>

                      <!-- fin de la div de modification -->

                      <!-- Début de la div en lecture simple -->

                      <div
                        class="bg-white rounded-border q-mt-md"
                        @click="activeEdit(index)"
                        v-else
                      >
                        <q-card-section class="">
                          <span class="text-h6">{{ element.name }}</span>
                        </q-card-section>
                        <q-card-section>
                          <div
                            v-for="option in element.weflyOption"
                            :key="option.id"
                          >
                            <q-icon
                              name="check_box_outline_blank"
                              color="grey"
                              size="sm"
                            />
                            {{ option.label }}
                          </div>
                          <div class="text-grey" v-if="element.autres">
                            <q-icon
                              name="check_box_outline_blank"
                              color="grey"
                              size="sm"
                            />
                            Autres
                          </div>
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                            v-model="element.required"
                            label="Obligatoire"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            left-label
                          />

                          <q-toggle
                            v-model="element.unique"
                            label="Unique"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            left-label
                          />

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>

                      <!-- fin de la div en lecture simple -->
                    </div>
                    <!-- <================== type radio ====================> -->
                    <div v-if="element.type === 'radio'">
                      <!-- Debut de la div de modification -->

                      <div
                        class="my-card-rigth bg-white rounded-border q-mt-md"
                        v-if="element.edit"
                      >
                        <q-card-section class="">
                          <q-input
                            color="green-10"
                            filled
                            v-model="element.name"
                            autofocus
                          />
                        </q-card-section>
                        <q-card-section class="q-gutter-sm">
                          <div
                            v-for="option in element.weflyOption"
                            :key="option.id"
                          >
                            <div
                              class="row items-center justify-between"
                              v-if="option.edit"
                            >
                              <q-icon
                                class="col-1"
                                color="grey"
                                name="radio_button_unchecked"
                                size="sm"
                              />
                              <q-input
                                class="col-10"
                                v-model="option.label"
                                autofocus
                              />
                              <q-btn
                                flat
                                round
                                class=""
                                color="red"
                                icon="clear"
                                @click="removeOptionAt(option.id, index)"
                                size="sm"
                              />
                            </div>
                            <div v-else>
                              <span
                                @click="activeOptionEdit(option.id, element.id)"
                              >
                                <q-icon
                                  flat
                                  name="radio_button_unchecked"
                                  color="grey"
                                  size="sm"
                                />
                                {{ option.label }}
                              </span>
                            </div>
                          </div>
                          <div class="row" v-if="element.autres">
                            <q-icon
                              class="col-1"
                              color="grey"
                              name="radio_button_unchecked"
                              size="sm"
                            />
                            <q-input
                              class="col-10"
                              placeholder="Autres"
                              autofocus
                              readonly
                            />
                            <q-btn
                              flat
                              round
                              class=""
                              color="red"
                              icon="clear"
                              @click="removeOtherOption(index)"
                              size="sm"
                            />
                          </div>
                          <div class="text-grey">
                            <span @click="addOption(index)"
                              ><q-icon name="radio_button_unchecked" size="sm" />
                              Ajouter une option ou
                            </span>
                            <q-btn
                              label='ajouter "Autres"'
                              flat
                              color="primary"
                              @click="addOtherOption(index)"
                              no-caps
                              dense
                              v-if="!element.autres"
                            />
                          </div>
                          <q-separator inset />
                          <q-card-actions class="q-gutter-md" align="right">
                            <q-toggle
                              v-model="element.required"
                              label="Obligatoire"
                              checked-icon="check"
                              color="green"
                              unchecked-icon="clear"
                              left-label
                            />

                            <q-toggle
                              v-model="element.unique"
                              label="Unique"
                              checked-icon="check"
                              color="green"
                              unchecked-icon="clear"
                              left-label
                            />

                            <q-separator vertical inset />
                            <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                            <q-btn
                              flat
                              rounded
                              icon="remove_circle"
                              @click="deleteOnModel(index)"
                            />
                          </q-card-actions>
                        </q-card-section>
                      </div>

                      <!-- fin de la div de modification -->

                      <!-- Début de la div en lecture simple -->

                      <div
                        class="bg-white rounded-border q-mt-md"
                        @click="activeEdit(index)"
                        v-else
                      >
                        <q-card-section class="">
                          <span class="text-h6">{{ element.name }}</span>
                        </q-card-section>
                        <q-card-section>
                          <div
                            v-for="option in element.weflyOption"
                            :key="option.id"
                          >
                            <q-icon
                              name="radio_button_unchecked"
                              color="grey"
                              size="sm"
                            />
                            {{ option.label }}
                          </div>
                          <div class="text-grey" v-if="element.autres">
                            <q-icon
                              name="radio_button_unchecked"
                              color="grey"
                              size="sm"
                            />
                            Autres
                          </div>
                        </q-card-section>
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                            v-model="element.required"
                            label="Obligatoire"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            left-label
                          />

                          <q-toggle
                            v-model="element.unique"
                            label="Unique"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            left-label
                          />

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>

                      <!-- fin de la div en lecture simple -->
                    </div>

                    <!-- <================== type select ====================> -->
                    <div v-if="element.type === 'select'">
                      <!-- Debut de la div de modification -->

                      <div
                        class="my-card-rigth bg-white rounded-border q-mt-md"
                        v-if="element.edit"
                      >
                        <q-card-section class="">
                          <q-input
                            color="green-10"
                            filled
                            v-model="element.name"
                            autofocus
                          />
                        </q-card-section>
                        <q-card-section class="q-gutter-sm">
                          <div
                            v-for="option in element.weflyOption"
                            :key="option.id"
                          >
                            <div
                              class="row items-center justify-between"
                              v-if="option.edit"
                            >
                              <div>{{ option.id }}.</div>
                              <q-input
                                class="col-10"
                                v-model="option.label"
                                autofocus
                                dense
                              />
                              <q-btn
                                flat
                                round
                                class=""
                                color="red"
                                icon="clear"
                                @click="removeOptionAt(option.id, index)"
                                size="md"
                              />
                            </div>
                            <div v-else>
                              <span
                                @click="activeOptionEdit(option.id, element.id)"
                              >
                                <span class="">{{ option.id }}.</span>
                                {{ option.label }}
                              </span>
                            </div>
                          </div>
                          <div class="text-grey">
                            <span @click="addOption(index)">
                              {{ element.weflyOption.length + 1 }}. Ajouter une
                              option
                            </span>
                          </div>
                        </q-card-section>
                      </div>

                      <!-- fin de la div de modification -->

                      <!-- Début de la div en lecture simple -->

                      <div
                        class="bg-white rounded-border q-mt-md"
                        @click="activeEdit(index)"
                        v-else
                      >
                        <q-card-section class="">
                          <span class="text-h6">{{ element.name }}</span>
                        </q-card-section>
                        <q-card-section>
                          <div
                            v-for="option in element.weflyOption"
                            :key="option.id"
                          >
                            <span class="">{{ option.id }}.</span>
                            {{ option.label }}
                          </div>
                        </q-card-section>
                      </div>
                    </div>
                    <!-- fin de la div en lecture simple -->

                    <!-- <================== type date ====================> -->
                    <div v-if="element.type === 'date'">
                      <!-- Debut de la div de modification -->

                      <div
                        class="my-card-rigth bg-white rounded-border q-mt-md"
                        v-if="element.edit"
                      >
                        <q-card-section class="">
                          <q-input
                            color="green-10"
                            filled
                            v-model="element.name"
                            autofocus
                          />
                        </q-card-section>
                        <q-card-section>
                          <q-input
                            :type="element.type"
                            :placeholder="element.placeholder"
                            dense="dense"
                            readonly
                          />
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                            v-model="element.required"
                            label="Obligatoire"
                            left-label
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                          />

                          <q-toggle
                            v-model="element.unique"
                            label="Unique"
                            left-label
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                          />

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>

                      <!-- fin de la div de modification -->

                      <!-- Début de la div en lecture simple -->

                      <div
                        class="bg-white rounded-border q-mt-md"
                        @click="activeEdit(index)"
                        v-else
                      >
                        <q-card-section class="">
                          <div class="text-h6">{{ element.name }}</div>
                        </q-card-section>
                        <q-card-section>
                          <q-input
                            :type="element.type"
                            v-model="element.model"
                            :placeholder="element.placeholder"
                            dense="dense"
                            readonly
                          />
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                            v-model="element.required"
                            label="Obligatoire"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            left-label
                          />

                          <q-toggle
                            v-model="element.unique"
                            label="Unique"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            left-label
                          />

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>
                      <!-- fin de la div en lecture simple -->
                    </div>

                    <!-- <================== type datetime ====================> -->
                    <div v-if="element.type === 'datetime'">
                      <!-- Debut de la div de modification -->

                      <div
                        class="my-card-rigth bg-white rounded-border q-mt-md"
                        v-if="element.edit"
                      >
                        <q-card-section class="">
                          <q-input
                            color="green-10"
                            filled
                            v-model="element.name"
                            autofocus
                          />
                        </q-card-section>
                        <q-card-section>
                          <q-input filled v-model="date">
                            <template v-slot:prepend>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                                    <div class="row items-center justify-end">
                                      <q-btn
                                        v-close-popup
                                        label="Close"
                                        color="primary"
                                        flat
                                      />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>
                            </template>

                            <template v-slot:append>
                              <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-time
                                    v-model="date"
                                    mask="YYYY-MM-DD HH:mm"
                                    format24h
                                  >
                                    <div class="row items-center justify-end">
                                      <q-btn
                                        v-close-popup
                                        label="Close"
                                        color="primary"
                                        flat
                                      />
                                    </div>
                                  </q-time>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                          checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.require"
                            label="Obligatoire"
                            left-label
                          />
                          <q-toggle
                          checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.unique"
                            label="Unique"
                            left-label
                          />
                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>

                      <!-- fin de la div de modification -->

                      <!-- Début de la div en lecture simple -->

                      <div
                        class="bg-white rounded-border q-mt-md"
                        @click="activeEdit(index)"
                        v-else
                      >
                        <q-card-section class="">
                          <div class="text-h6">{{ element.name }}</div>
                        </q-card-section>
                        <q-card-section>
                          <q-input
                            :type="element.type"
                            placeholder="Date et l'heure"
                            dense="dense"
                            readonly
                          />
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                          checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.require"
                            label="Obligatoire"
                            left-label
                          />
                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>
                      <!-- fin de la div en lecture simple -->
                    </div>

                    <!-- <================== type file ====================> -->
                    <div v-if="element.type === 'file'">
                      <!-- Debut de la div de modification -->

                      <div
                        class="my-card-rigth bg-white rounded-border q-mt-md"
                        v-if="element.edit"
                      >
                        <q-card-section class="">
                          <q-input
                            color="green-10"
                            filled
                            v-model="element.name"
                            autofocus
                          />
                          <!-- Les checkbox d'option de type de fichier -->
                          <q-option-group
                            v-model="element.allowedTypes"
                            type="checkbox"
                            :options="optionsType"
                            color="primary"
                            inline
                          />
                          {{ element.group }}

                          <q-file
                            borderless
                            :placeholder="element.placeholder"
                            color="green-10"
                            filled
                            v-model="element.name"
                            autofocus
                            readonly
                          >
                            <template v-slot:prepend>
                              <q-icon name="upload_file" @click.stop />
                            </template>
                          </q-file>

                          <!-- <q-input color="green-10" filled v-model="element.name" autofocus /> -->
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                          checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.required"
                            label="Obligatoire"
                            left-label
                          />

                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.unique"
                            label="Unique"
                            left-label
                          />

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>

                      <!-- fin de la div de modification -->

                      <!-- Début de la div en lecture simple -->

                      <div
                        class="bg-white rounded-border q-mt-md"
                        @click="activeEdit(index)"
                        v-else
                      >
                        <q-card-section class="">
                          <div class="text-h6">{{ element.name }}</div>
                        </q-card-section>
                        <q-card-section>
                          <q-file
                            borderless
                            label="Importer un document"
                            color="green-10"
                            v-model="element.name"
                            :placeholder="element.placeholder"
                            dense="dense"
                            readonly
                          >
                            <template v-slot:prepend>
                              <q-icon name="upload_file" @click.stop />
                            </template>
                          </q-file>
                          <!-- <q-input :type="element.type" v-model="element.model"  :placeholder="element.placeholder"  dense="dense" readonly/> -->
                        </q-card-section>
                        <!-- Menu de control -->
                        <q-separator inset />
                        <q-card-actions class="q-gutter-md" align="right">
                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.required"
                            label="Obligatoire"
                            left-label
                          />

                          <q-toggle
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            v-model="element.unique"
                            label="Unique"
                            left-label
                          />

                          <q-separator vertical inset />
                          <!-- <q-btn flat  rounded  icon="content_copy" @click="cloneOnModel(index)"/> -->
                          <q-btn
                            flat
                            rounded
                            icon="remove_circle"
                            @click="deleteOnModel(index)"
                          />
                        </q-card-actions>
                      </div>
                      <!-- fin de la div en lecture simple -->
                    </div>
                  </div>
                </template>
              </draggable>

              <!-- <span class="text-h5 q-pa-md text-grey-6" style="text-align: center">DEPOSEZ-ICI</span> -->
              <div class="text-h5 q-pa-md text-grey-6" style="text-align: center;">DEPOSEZ - ICI</div>
            </q-card>
              

            <q-btn
              color="primary"
              icon="check"
              label="sauvegarder le formulaire"
              class="q-mt-md"
              type="submit"
            />

            <!-- <q-btn
              color="primary"
              icon="check"
              label="sauvegarder le formulaire"
              @click="saveTemplateForm"
              class="q-mt-md"
            /> -->

          </q-form>


          <div class="q-mt-lg">
            <h3>Resultat</h3>

            {{ templateForm }}
          </div>


          
       
        </div>
      
    </div>

    <q-dialog v-model="confirmation">
      <div style="width: 700px">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-center" style="width:90%;">
            Choix de groupe
          </div>
          <q-space/>
          <q-btn icon="close" color="dark" flat round v-close-popup />
        </q-card-section>

        <q-card-section style="width:90%; margin:auto">
          <q-form @submit="saveTemplateForm" ref="eForm">

            <q-select
              outlined
              v-model="groupe"
              use-input
              input-debounce="0"
              :label="$t('group')"
              :options="options"
              option-label="title"
              option-value="id"
              @filter="filterFn"
              lazy-rules
              :rules="[ val => !!val || 'Le champ role est obligatoire']"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    {{ $t('no_data')}}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <div class="q-mt-xs q-mb-sm" style="text-align: center">
              <q-btn v-close-popup :label="$t('modal.cancel')" padding="xs xl" style="width:47%" color="white" text-color="black"/>
              <q-btn type="submit" 
              :label="$t('modal.add')" 
              padding="xs xl" 
              style="width:47%" 
              color="primary" 
              class="q-ml-md"
              :loading="submitting"
              >
                <template v-slot:loading>
                  <q-spinner-facebook size="lg"/>
                </template>
              </q-btn>
            </div>
          
          </q-form>
        </q-card-section>
        </q-card>

      </div>
    </q-dialog>

    <!-- ===========  Q-DIALOQ  ============== -->

    <!-- <q-dialog v-model="visible">
      <q-card class="my-card q-pa-md" style="width: 500px">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div v-for="item in items.form" :key="item">
            <q-input outlined 
              v-model="form[item.model]"
              :label="item.name"
              :type="item.type"
              autofocus
            />
          </div>
          <q-btn label="Submit" type="submit" color="primary" />
        </q-form>
      </q-card>
    </q-dialog> -->
  </q-page>
</template>

<script>
import qs from "qs";
import { Notify } from 'quasar'
import axios from "axios"
import { ref, isRef, getCurrentInstance, defineComponent, onMounted, inject  } from "vue";
import draggable from "vuedraggable";
export default defineComponent({
  name: "custom-clone",
  display: "Custom Clone ",
  order: 3,
  components: {
    draggable,
  },
  props: {
    idTypeFormulaire: {
      //type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    let modelForms = ref([]);
    let templateForm = ref([]);
    let items = ref({});
    let visible = ref(false);
    let nom = ref("");
    let form = ref({});
    let idFormulaire = ref()
    let liste_sections = ref('') 
    let eForm = ref(null);
    let confirmation = ref(false)
    let groupe = ref()
    let submitting = ref(false)
    let userGroupe = ref()

    const serviceGroupe = "groupes";
    let stateGroupe = inject(serviceGroupe)


    self = getCurrentInstance();

    modelForms.value = [
      {
        id: 0,
        name: "Champ text",
        type: "text",
        placeholder: "Champ de saisie texte",
        model: "",
        description: "Champ de saisie text",
      },
      {
        id: 6,
        name: "Zone de texte",
        type: "textarea",
        placeholder: "Zone de texte",
        model: "",
      },
      {
        id: 2,
        name: "Champ email",
        type: "email",
        placeholder: "exemple@email.com",
        model: "",
      },
      {
        id: 1,
        name: "champ de type nombre",
        type: "number",
        placeholder: "0123456789",
        model: "",
      },

      {
        id: 3,
        name: "Telephone",
        type: "tel",
        placeholder: "+225 01000000001",
        model: "",
      },

      {
        name: "Selection",
        model: "",
        type: "select",
        label: "Liste déroulant",
        id: 4,
      },
      {
        name: "checkbox",
        model: "",
        type: "checkbox",
        label: "Case à coché",
        id: 5,
      },
      {
        name: "Radio",
        model: "",
        type: "radio",
        label: "Choix mutilple",
        id: 9,
      },
      {
        name: "date",
        model: "",
        type: "date",
        label: "2019/02/01",
        id: 7,
      },
      {
        name: "datetime",
        model: "",
        type: "datetime",
        label: "2019/02/01",
        id: 8,
      },

      {
        name: "fichier",
        model: "",
        type: "file",
        label: "Fichier",
        accept: "file/pdf,file/word,file/excel",
        id: 9,
      },
    ];

    templateForm.value = [];

    let removeAt = (idx) => {
      templateForm.value.splice(idx, 1);
    };

    let removeOptionAt = (index_option, index_table) => {
      console.log(index_table);
      console.log(index_option);
      for (let i = 0; i < templateForm.value[index_table].weflyOption.length; i++) {
        if (templateForm.value[index_table].weflyOption[i].id == index_option) {
          templateForm.value[index_table].weflyOption.splice(i, 1);
        }
      }
    };

    let log = (evt) => {
      window.console.log(evt);
      for (let index = 0; index < templateForm.value.length; index++) {
        if (index + 1 !== templateForm.value.length) {
          console.log(index);
          templateForm.value[index].edit = false;
        }
      }
    };

    let cloneDog = ({ id, placeholder, model, type }) => {
      console.log("on est ici");
      let result;
      switch (type) {
        case "checkbox":
          result = {
            id: `${templateForm.value.length + 1}`,
            name: "Champ sans titre",
            model: `${model}`,
            type: `${type}`,
            placeholder: `${placeholder}`,
            edit: true,
            weflyOption: [{ id: 1, label: "Option 1", edit: false }],
            autres: false,
            required: false,
            unique: false,
            defaultValue:ref()
          };
          break;
        case "radio":
          result = {
            id: `${templateForm.value.length + 1}`,
            name: "Champ sans titre",
            model: `${model}`,
            type: `${type}`,
            placeholder: `${placeholder}`,
            edit: true,
            weflyOption: [{ id: 1, label: "Option 1", edit: false }],
            autres: false,
            required: false,
            unique: false,
             defaultValue:ref()
          };
          break;
        case "select":
          result = {
            id: `${templateForm.value.length + 1}`,
            name: "Champ sans titre",
            model: `${model}`,
            type: `${type}`,
            placeholder: `${placeholder}`,
            edit: true,
            weflyOption: [{ id: 1, label: "Option 1", edit: false }],
            required: false,
            unique: false,
             defaultValue:ref()
          };
          break;

        case "file":
          result = {
            id: `${templateForm.value.length + 1}`,
            name: "Champ sans titre",
            model: `${model}`,
            type: `${type}`,
            placeholder: `${placeholder}`,
            edit: true,
            required: false,
            unique: false,
            allowedTypes: ref([]),
            defaultValue:ref()
          };
          break;

        default:
          result = {
            id: `${templateForm.value.length + 1}`,
            name: "Champ sans titre",
            model: `${model}`,
            type: `${type}`,
            placeholder: `${placeholder}`,
            edit: true,
            required: false,
            unique: false,
            lengthTable: {
              status: false,
              maxlength: ref(),
              minlength: ref(),
               defaultValue:ref()
            },
          };
          
          break;
      }
      return result;
    };
    /**
     * Fonction permettant de rendre editable
     */
    let getModel = (id) => {
      console.log(id);
      if (templateForm.value[id].model !== "") {
        templateForm.value[id].edit = false;
        templateForm.value[id].label = templateForm.value[id].model;
        templateForm.value[id].name = templateForm.value[id].model;
        templateForm.value[id].label = "";
      }
    };
    let updateModel = (id) => {
      console.log(id);
      templateForm.value[id].edit = true;
    };

    const token = self.appContext.app.config.globalProperties.$sdata.value.jwt;
    userGroupe = self.appContext.app.config.globalProperties.$sdata.value.user.groupes.length

    onMounted( async() =>{
      liste_sections= inject('editActive')

      const query = qs.stringify({
        _where: [{titre: props.idTypeFormulaire}],
      });

      try {
        let res = await self.appContext.app.config.globalProperties.$axios({
          url: `http://localhost:1338/type-formulaires?${query}`,
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`
        }
        })

        idFormulaire.value = Object.values(res.data)[0]

        // recuperation des groupes
        stateGroupe.filters.value = Object.assign(
        stateGroupe.filters.value ? stateGroupe.filters.value : {},
        {
          _limit: 10000,
          _start: 0,
        }
      );
        await stateGroupe.getItems()

      } catch (error) {
        console.log(error);
      }

    } )

      const options = ref(stateGroupe.items.value)

      console.log(options.value);

      let filterFn = (val, update) => {
          if (val === '') {
            update(() => {
              options.value = stateGroupe.items.value
            })
            return
          }
          update(() => {
            const needle = val.toLowerCase()
            options.value = stateGroupe.items.value.filter(v => v.title.toLowerCase().indexOf(needle) > -1)
          })
        }

    let saveTemplateForm = async () => {

      if (eForm.value.validate()) {
   
        if (templateForm.value.length === 0) {
          confirmation.value = false
          Notify.create({
            message: "Le formulaire est vide",
            type: "negative",
            position: 'top-right'
          })

        } else {

          try {
            let res = await self.appContext.app.config.globalProperties.$axios({
              //url: "http://localhost:1338/formulaires/custom",
              url: "http://localhost:1338/formulaires",
              method: "post",
              data: {
                nom: nom.value,
                form: templateForm.value,
                type_formulaire : idFormulaire.value.id,
                groupe: groupe.value
              },
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            nom.value = null
            templateForm.value = null

            confirmation.value = false

            liste_sections.value= 'liste_sections'
            Notify.create({
              message: "Formulaire ajouté",
              type: "positive",
              position: 'top-right'
            })



          } catch (error) {
            console.log(error);
          }
        }
        
      }
      
    };

    //fonction onSubmit

    let onSubmit = () => {
      confirmation.value = true
    };

    /**
     * fonction click dans le formulaire en création
     */
    let activeEdit = (id) => {
      console.log(templateForm.value[id].edit);
      for (let index = 0; index < templateForm.value.length; index++) {
        if (index !== id) {
          templateForm.value[index].edit = false;
        }
      }
      if (templateForm.value[id].edit !== true) {
        templateForm.value[id].edit = true;
      }
    };

    let addOption = (id) => {
      const numero = templateForm.value[id].weflyOption.length + 1;
      // console.log('numero | ',numero);
      for (let index = 0; index < templateForm.value[id].weflyOption.length; index++) {
        if (templateForm.value[id].weflyOption[index] === undefined) {
          templateForm.value[id].weflyOption.splice(index, 1);
        }
      }
      templateForm.value[id].weflyOption.push({
        id: numero,
        label: "Option " + numero,
        edit: true,
      });
      // console.log(templateForm.value[id].weflyOption)
    };

    let desactiveOptionEdit = (id, i) => {
      console.log(i);
      console.log(id);
      for (let index = 0; index < templateForm.value.length; index++) {
        if (templateForm.value[index].id == i) {
          for (let n = 0; n < templateForm.value[index].weflyOption.length; n++) {
            if (templateForm.value[index].weflyOption[n].id == id) {
              templateForm.value[index].weflyOption[n].edit = false;
            }
          }
        }
      }
      // templateForm.value[i].weflyOption[id].edit = false
    };
    let activeOptionEdit = (id, i) => {
      console.log(i);
      console.log(id);
      for (let index = 0; index < templateForm.value.length; index++) {
        if (templateForm.value[index].id == i) {
          for (let n = 0; n < templateForm.value[index].weflyOption.length; n++) {
            if (templateForm.value[index].weflyOption[n].id == id) {
              templateForm.value[index].weflyOption[n].edit = true;
            }
          }
        }
      }
      // templateForm.value[i].weflyOption[id].edit = false
    };
    let addOtherOption = (idx) => {
      console.log(idx);
      templateForm.value[idx].autres = true;
    };
    let removeOtherOption = (idx) => {
      templateForm.value[idx].autres = false;
    };
    let desactiveAllEdit = () => {
      for (let index = 0; index < templateForm.value.length; index++) {
        templateForm.value[index].edit = false;
      }
    };
    let deleteOnModel = (e) => {
      console.log(e);
      templateForm.value.splice(e, 1);
    };
    let cloneOnModel = (i) => {
      const newModelForm = ref(templateForm.value[i]);
      newModelForm.value.id = ++templateForm.value.length;
      // console.log();
      for (let index = 0; index < templateForm.value.length; index++) {
        if (templateForm.value[index] === undefined) {
          templateForm.value.splice(index, 1);
        }
      }
      templateForm.value.push(newModelForm.value);
    };
    return {
      cloneOnModel,
      deleteOnModel,
      desactiveAllEdit,
      removeOtherOption,
      addOtherOption,
      removeOptionAt,
      activeOptionEdit,
      desactiveOptionEdit,
      addOption,
      activeEdit,
      nom,
      modelForms,
      templateForm,
      removeAt,
      log,
      cloneDog,
      getModel,
      updateModel,
      saveTemplateForm,
      form,
      shape: ref("line"),
      date: ref("2019/02/01"),
      value: ref(true),
      idFormulaire,
      eForm,
      confirmation,
      onSubmit,
      filterFn,
      options,
      groupe,
      submitting,
      userGroupe,
       
    // Les  options types fichiers
       
        optionsType: [
            {
              label: 'Audio/Video',
              value: 'videos'
            },
            {
              label: 'Document',
              value: 'files'
            },
            {
              label: 'Image',
              value: 'images'
            }
          ],
    };
  },
});
</script>
<style scoped>
.hover_drop:hover {
  cursor: all-scroll;
}
.checkbox:hover {
  cursor: pointer;
}
.ghost {
  opacity: 0.5;
  background: #d6d6d6;
}
.my-card-header {
  border-top-width: 5px;
  border-top-style: solid;
  border-top-color: green;
  border-radius: 4px;
  border-left-width: thin;
}
.my-card-rigth {
  border-left-width: 5px;
  border-left-style: solid;
  border-left-color: green;
  border-radius: 4px;
}
</style>
